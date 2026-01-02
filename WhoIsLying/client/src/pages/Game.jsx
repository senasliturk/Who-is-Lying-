import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

const API_URL = "http://localhost:5000"; 

export default function Game() {
  const { type } = useParams(); 
  const navigate = useNavigate();
  const [scenario, setScenario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("suspects");
  const [selectedChar, setSelectedChar] = useState(null); 
  const [markedSuspects, setMarkedSuspects] = useState([]); 
  const [gameResult, setGameResult] = useState(null); 
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setLoading(true);
    setScenario(null);
    setGameResult(null);
    setMarkedSuspects([]);
    setSelectedChar(null);

    fetch(`${API_URL}/api/scenarios?type=${type}`)
      .then(res => res.json())
      .then(data => {
        const list = data.scenarios || [];
        if (list.length > 0) {
          setScenario(list[0]);
        } else {
          setScenario(null);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Data extraction error:", err);
        setLoading(false);
      });
  }, [type]);

  const toggleSuspect = (charId) => {
    if (markedSuspects.includes(charId)) {
      setMarkedSuspects(prev => prev.filter(id => id !== charId));
    } else {
      setMarkedSuspects(prev => [...prev, charId]);
    }
  };

  const handleAccuse = () => {
    if (!selectedChar || !scenario) return;
    if (selectedChar.charId === scenario.solution) {
      setGameResult("win");
    } else {
      setGameResult("lose");
    }
  };

  if (loading) return <div className="loading-screen">ACCESSING DATABASE... <br/> DECRYPTING FILES...</div>;
  return (
    <div className="game-container">

      {gameResult === "win" && (
        <Confetti 
          width={windowSize.width} 
          height={windowSize.height} 
          numberOfPieces={200}
          gravity={0.3}
        />
      )}

      <div className="header-section">
        <div>
          <h4 className="case-id">CASE FILE: #{scenario._id.toString().slice(-6).toUpperCase()}</h4>
          <h1 className="case-title">{scenario.title}</h1>
          <p className="case-desc">{scenario.description}</p>
        </div>
        <button onClick={() => navigate("/")} className="abort-btn">❌ ABORT MISSION</button>
      </div>

      <div className="tabs">
        <button 
          onClick={() => { setActiveTab("suspects"); }}
          className={`tab-btn ${activeTab === "suspects" ? "active" : ""}`}
        >
          🕵️ SUSPECTS
        </button>
        <button 
          onClick={() => setActiveTab("forensics")}
          className={`tab-btn forensics ${activeTab === "forensics" ? "active" : ""}`}
        >
          💻 DIGITAL FORENSICS
        </button>
      </div>

      <div className="content-area">

        <div className="left-panel">

          {activeTab === "suspects" && (
            <div className="suspects-grid">
              {scenario.characters.map((char) => {
                const isMarked = markedSuspects.includes(char.charId);
                const isViewing = selectedChar?.charId === char.charId;

                return (
                  <div 
                    key={char.charId}
                    onClick={() => setSelectedChar(char)}
                    className={`polaroid-card ${isMarked ? "marked" : ""} ${isViewing ? "viewing" : ""}`}
                  >
                    <div className="image-wrapper">
                        <img src={char.avatarUrl} alt={char.name} />
                    </div>
                    <div className="char-name">{char.name}</div>
                    {isMarked && <div className="suspect-badge">SUSPECT</div>}
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "forensics" && (
            <div className="terminal">
              <p>{">"} CONNECTING TO SERVER... SUCCESS</p>
              <p>{">"} DECRYPTING LOGS... DONE</p>
              <br/>
              {scenario.clues && scenario.clues.map((clue, idx) => (
                <div key={idx} className="clue-line" style={{ animationDelay: `${idx * 0.2}s` }}>
                  <span className="clue-type">{clue.type ? clue.type.toUpperCase() : "INFO"}</span> 
                  {clue.text}
                </div>
              ))}
              <p className="blinking-cursor">{">"} WAITING FOR INPUT_</p>
            </div>
          )}
        </div>
        <div className="right-panel">
          {activeTab === "suspects" && selectedChar && !gameResult && (
            <div className="interrogation-card">
              <h2 className="panel-title">INTERROGATION RECORD</h2>
              
              <div className="char-header">
                <img src={selectedChar.avatarUrl} className="char-thumb" />
                <div>
                  <h3 className="char-detail-name">{selectedChar.name}</h3>
                  <span className="char-role">{selectedChar.role}</span>
                  <div className="char-meme">"{selectedChar.memeTitle}"</div>
                </div>
              </div>

              <div className="info-block">
                <strong>PERSONALITY:</strong>
                <p>{selectedChar.personality}</p>
              </div>

              <div className="statement-block">
                <strong>STATEMENT:</strong>
                <p>"{selectedChar.statement}"</p>
              </div>

              <div className="action-buttons">

                <button 
                  onClick={() => toggleSuspect(selectedChar.charId)}
                  className={`mark-btn ${markedSuspects.includes(selectedChar.charId) ? "active" : ""}`}
                >
                  {markedSuspects.includes(selectedChar.charId) ? "UNMARK SUSPECT" : "MARK AS SUSPECT"}
                </button>
                <button 
                  onClick={handleAccuse}
                  className="accuse-btn"
                >
                  🔥 ACCUSE & SOLVE
                </button>
              </div>
            </div>
          )}
           {activeTab === "suspects" && !selectedChar && !gameResult && (
            <div className="empty-state">
              <p>Select a file to investigate details.</p>
            </div>
          )}

          {gameResult && (
            <div className={`result-card ${gameResult}`}>
              <h1 className="result-title">
                {gameResult === "win" ? "CASE SOLVED" : "FAILED"}
              </h1>
              <p className="result-msg">
                {gameResult === "win" 
                  ? "Good job, Detective. You found the liar." 
                  : "You accused the wrong person. The real culprit escaped."}
              </p>
              
              <div className="truth-section">
                <strong>THE TRUTH:</strong>
                <p>{scenario.explanation}</p>
              </div>

              <button onClick={()=>window.location.reload()} className="restart-btn">PLAY AGAIN</button>
            </div>
          )}

        </div>
      </div>
      <style>{`

        .game-container {
         min-height: 100vh; 
         padding: 20px;
          font-family: 'Courier New', monospace; 
          color: #e0e0e0;
        }
        .loading-screen {
         padding: 50px; 
         text-align: center; 
         color: #0f0; 
         font-family: monospace; 
         font-size: 1.2rem; 
         }
        .header-section { border-bottom: 1px solid #444; padding-bottom: 20px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; }
        .case-id { color: #888; margin: 0; font-size: 0.9rem; letter-spacing: 1px; }
        .case-title { color: #fff; margin: 5px 0; font-size: 2rem; text-shadow: 0 0 10px rgba(255,255,255,0.2); }
        .case-desc { color: #aaa; max-width: 600px; font-size: 0.9rem; }
        .abort-btn { border: 1px solid #d14; color: #d14; background: transparent; padding: 8px 16px; cursor: pointer; transition: 0.3s; }
        .abort-btn:hover { background: #d14; color: #fff; }
        .tabs { display: flex; gap: 15px; margin-bottom: 20px; }
        .tab-btn { background: transparent; color: #888; border: 1px solid #444; padding: 10px 20px; cursor: pointer; font-weight: bold; transition: 0.3s; }
        .tab-btn.active { background: #c0c0c0; color: #000; border-color: #c0c0c0; }
        .tab-btn.forensics.active { background: #0f0; color: #000; border-color: #0f0; box-shadow: 0 0 15px #0f0; }
        .content-area { display: flex; gap: 30px; flex-wrap: wrap; }
        .left-panel { flex: 2; min-width: 300px; }
        .right-panel { flex: 1; min-width: 300px; }
        .suspects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 25px; }
        .polaroid-card { 
          background: #fff; 
          padding: 10px 10px 40px 10px; 
          box-shadow: 0 5px 15px rgba(0,0,0,0.5); 
          cursor: pointer; 
          position: relative;
          transition: transform 0.3s ease, z-index 0.3s;
          transform: rotate(-2deg);
        }
        .polaroid-card:nth-child(even) { transform: rotate(2deg); }

        .polaroid-card:hover { transform: scale(1.05) rotate(0deg); z-index: 10; }
        
        /* Seçili Kişi: Kenarları parlar */
        .polaroid-card.viewing { border: 2px solid #00d2ff; }

        /* İŞARETLİ (Marked): Kırmızı çerçeve */
        .polaroid-card.marked { border: 2px solid #d14; }

        /* RESİM EFEKTİ: Varsayılan Siyah Beyaz -> Hover/Marked Renkli */
        .image-wrapper { height: 180px; overflow: hidden; background: #000; }
        .image-wrapper img { 
          width: 100%; height: 100%; object-fit: cover; 
          filter: grayscale(100%) contrast(1.1); /* Başlangıçta Siyah Beyaz */
          transition: filter 0.4s ease;
        }

        /* Hover yapınca VEYA İşaretliyse VEYA Detayı görüntüleniyorsa RENKLENİR */
        .polaroid-card:hover .image-wrapper img,
        .polaroid-card.marked .image-wrapper img,
        .polaroid-card.viewing .image-wrapper img {
          filter: grayscale(0%) contrast(1); /* Renkli olur */
        }

        .char-name { color: #000; text-align: center; margin-top: 10px; font-weight: bold; font-family: cursive; font-size: 1.1rem; }
        .suspect-badge { position: absolute; top: -10px; right: -10px; background: #d14; color: white; padding: 5px 10px; border-radius: 4px; font-weight: bold; box-shadow: 0 0 10px #d14; z-index: 10; font-size: 0.8rem; letter-spacing: 1px; }

        /* --- TERMINAL --- */
        .terminal { background: #000; border: 2px solid #0f0; padding: 20px; border-radius: 5px; font-family: monospace; color: #0f0; min-height: 450px; box-shadow: inset 0 0 20px rgba(0, 255, 0, 0.2); overflow-y: auto; }
        .clue-line { margin-bottom: 12px; opacity: 0; animation: fadeIn 0.5s forwards; }
        .clue-type { background: #0f0; color: #000; padding: 1px 6px; margin-right: 10px; font-weight: bold; }
        .blinking-cursor { animation: blink 1s infinite; margin-top: 20px; }

        /* --- SAĞ PANEL (INTERROGATION) --- */
        .interrogation-card { background: rgba(255,255,255,0.05); padding: 20px; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; animation: slideIn 0.3s; }
        .panel-title { color: #c0c0c0; border-bottom: 1px solid #444; padding-bottom: 10px; margin-top: 0; font-size: 1.2rem; }
        .char-header { display: flex; gap: 15px; margin-bottom: 15px; align-items: center; }
        .char-thumb { width: 70px; height: 70px; object-fit: cover; border-radius: 50%; border: 2px solid #c0c0c0; }
        .char-detail-name { margin: 0; color: #fff; font-size: 1.2rem; }
        .char-role { color: #d14; font-size: 0.8rem; text-transform: uppercase; font-weight: bold; }
        .char-meme { color: #888; font-size: 0.8rem; margin-top: 5px; font-style: italic; }
        .info-block { margin-bottom: 15px; }
        .info-block p { color: #aaa; font-size: 0.9rem; margin: 5px 0; }
        .statement-block { background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; border-left: 3px solid #d14; }
        .statement-block p { color: #ddd; font-style: italic; margin: 8px 0 0 0; line-height: 1.4; }
        
        /* Action Buttons */
        .action-buttons { display: flex; flex-direction: column; gap: 10px; margin-top: 20px; }
        .mark-btn { background: transparent; border: 1px solid #888; color: #888; padding: 10px; font-weight: bold; cursor: pointer; transition: 0.3s; }
        .mark-btn:hover { border-color: #fff; color: #fff; }
        .mark-btn.active { background: #d14; border-color: #d14; color: #fff; }
        
        .accuse-btn { background: #e0e0e0; color: #000; border: none; padding: 12px; font-weight: bold; cursor: pointer; transition: 0.3s; margin-top: 10px; border-radius: 4px; }
        .accuse-btn:hover { background: #fff; box-shadow: 0 0 15px rgba(255,255,255,0.4); }

        .empty-state { text-align: center; color: #666; padding-top: 50px; font-style: italic; }

        /* --- SONUÇ KARTI --- */
        .result-card { padding: 30px; text-align: center; border-radius: 8px; animation: fadeIn 0.5s; background: rgba(0,0,0,0.9); border: 2px solid; }
        .result-card.win { border-color: #0f0; }
        .result-card.lose { border-color: #d14; }
        .result-title { font-size: 3rem; margin: 10px 0; color: inherit; }
        .result-card.win .result-title { color: #0f0; }
        .result-card.lose .result-title { color: #d14; }
        .result-msg { color: #fff; font-size: 1.1rem; }
        .truth-section { text-align: left; margin-top: 20px; background: rgba(255,255,255,0.1); padding: 15px; border-radius: 8px; }
        .restart-btn { margin-top: 20px; background: #fff; color: #000; padding: 10px 20px; font-weight: bold; border: none; cursor: pointer; }

        /* Animasyonlar */
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </div>
  );
}