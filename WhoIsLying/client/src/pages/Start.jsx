import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Start() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("User parse error", e);
      }
    }
  }, []);

  const cards = [
    { 
      type: "party", 
      title: "🎉 Party Mystery", 
      desc: "House party, lost items, hidden lies...",
      img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600"
    },
    { 
      type: "campus", 
      title: "🏫 Campus Drama", 
      desc: "Incident at campus. Who is telling the truth?",
      img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=600" 
    },
    { 
      type: "fantasy", 
      title: "🧙 Fantasy Quest", 
      desc: "Magic, quests, traps... who is the traitor?",
      img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600" 
    },
  ];

  if (!user) {
    return (
      <div style={{ 
        maxWidth: 1000, 
        margin: "0 auto", 
        padding: "80px 20px", 
        textAlign: "center",
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <div className="glass-card" style={{ padding: "60px 40px", maxWidth: 800 }}>
          <h1 style={{ 
            fontSize: "4rem", 
            marginBottom: "20px", 
            color: "#e0e0e0", 
            textShadow: "0 0 30px #000",
            letterSpacing: "4px"
          }}>
            WHO IS LYING?
          </h1>
          
          <p style={{ 
            fontSize: "1.2rem", 
            color: "#aaa", 
            lineHeight: "1.8", 
            fontFamily: "monospace",
            maxWidth: 600,
            margin: "0 auto 40px auto"
          }}>
            "A story is already in motion… and someone is bending the truth.Three voices. Three alibis. One hidden lie.
            The question isn’t what happened…"
            <br/><br/>
            Welcome to the agency. To access the classified case files and start your investigation, you must identify yourself.
          </p>

          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            <button 
              onClick={() => navigate("/login")}
              style={{ padding: "15px 40px", fontSize: "1.1rem" }}
            >
              DETECTIVE LOGIN
            </button>
            <button 
              onClick={() => navigate("/register")}
              style={{ 
                padding: "15px 40px", 
                fontSize: "1.1rem", 
                background: "transparent", 
                color: "#c0c0c0", 
                border: "1px solid #555" 
              }}
            >
              NEW RECRUIT
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px" }}>

      <div style={{ marginBottom: 40, borderBottom: "1px solid #333", paddingBottom: 20, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:20 }}>
        <div>
          <h2 style={{ fontSize: "2rem", margin: 0, color: "#c0c0c0" }}>
            WELCOME BACK, <span style={{ color: "#fff" }}>{user.username?.toUpperCase() || "DETECTIVE"}</span>.
          </h2>
          <p style={{ color: "#666", marginTop: 5, fontFamily: "monospace" }}>
            Current Status: <span style={{ color: "#4ade80" }}>ACTIVE</span> | Clearance Level: <span style={{ color: "#4ade80" }}>HIGH</span>
          </p>
        </div>
        
        <div style={{ 
          background: "rgba(255,255,255,0.05)", 
          padding: "10px 20px", 
          borderRadius: 4, 
          border: "1px solid #333",
          fontSize: "0.9rem",
          color: "#aaa"
        }}>
          PENDING CASES: <b>3</b>
        </div>
      </div>

      <h3 style={{ color: "#888", marginBottom: 20, fontSize: "1rem" }}>AVAILABLE MISSIONS</h3>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
        gap: 30 
      }}>
        {cards.map((c) => (
          <div
            key={c.type}
            onClick={() => navigate(`/game/${c.type}`)}
            className="glass-card"
            style={{
              padding: 0,
              overflow: "hidden",
              cursor: "pointer",
              transition: "transform 0.3s ease, border-color 0.3s",
              border: "1px solid #333",
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              height: "100%"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.borderColor = "#c0c0c0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "#333";
            }}
          >
            <div className="card-image-container" style={{ height: 180, overflow: "hidden", borderBottom: "1px solid #333" }}>
              <img 
                src={c.img} 
                alt={c.title} 
              />
            </div>
            
            <div style={{ padding: 20, flex: 1, display:"flex", flexDirection:"column" }}>
              <h3 style={{ color: "#e0e0e0", fontSize: "1.3rem", marginBottom: 10 }}>{c.title}</h3>
              <p style={{ color: "#888", lineHeight: "1.5", flex:1, fontSize: "0.9rem" }}>{c.desc}</p>
              <div style={{ 
                marginTop: 20, 
                color: "#c0c0c0", 
                fontWeight: "bold", 
                fontSize: "0.8rem",
                display: "flex",
                alignItems: "center",
                gap: 5,
                textTransform: "uppercase"
              }}>
                START MISSION <span style={{fontSize:"1.2rem"}}>→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

}
