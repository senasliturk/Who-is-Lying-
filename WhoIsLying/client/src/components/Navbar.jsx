import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    const syncAuth = () => setToken(localStorage.getItem("token"));
    window.addEventListener("auth-changed", syncAuth);
    window.addEventListener("storage", syncAuth);
    return () => {
      window.removeEventListener("auth-changed", syncAuth);
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-changed"));
    setOpen(false);
    navigate("/login", { replace: true });
  };

  const switchUser = () => {
    logout();
  };
  const navStyle = {
    display: "flex",
    alignItems: "center",
    padding: "15px 40px",
    background: "rgba(0,0,0,0.8)",
    borderBottom: "1px solid #333",
    position: "sticky",
    top: 0,
    zIndex: 100
  };

  const brandStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#c0c0c0",
    textDecoration: "none",
    letterSpacing: "2px",
    fontFamily: "'Courier New', monospace"
  };
  const linkStyle = {
    color: "#aaa",
    fontSize: "0.9rem",
    textTransform: "uppercase",
    transition: "0.3s"
  };
  const authButtonStyle = {
    ...linkStyle,
    color: "#c0c0c0",
    border: "1px solid #555",
    padding: "6px 12px",
    borderRadius: 4,
    backgroundColor: "rgba(0,0,0,0.3)"
  };

  return (
    <div style={navStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
        <Link to="/" style={brandStyle}>WhoIsLying?</Link>
        <Link to="/" style={linkStyle}>Home</Link>
      </div>

      <div style={{ marginLeft: "auto" }}>
        {!token ? (
          <div style={{ display: "flex", gap: 15 }}>
            <Link to="/login" style={authButtonStyle}>Login</Link>
            <Link to="/register" style={authButtonStyle}>Register</Link>
          </div>
        ) : (
          <div ref={wrapRef} style={{ position: "relative", display: "inline-block" }}>
            <button
              onClick={() => setOpen((v) => !v)}
              style={{
                border: "1px solid #555",
                color: "#c0c0c0",
                padding: "8px 16px",
                fontSize: "0.8rem",
                background: "transparent"
              }}
            >
              ACCOUNT ▾
            </button>

            {open && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  marginTop: 12,
                  width: 200,
                  background: "#000",
                  border: "1px solid #333",
                  padding: 5,
                  zIndex: 50,
                }}
              >
                <button
                  onClick={switchUser}
                  style={{ width: "100%", textAlign: "left", marginBottom: 2, border:"none", color:"#aaa", fontSize:"0.8rem" }}
                >
                  👤 Switch User
                </button>

                <button
                  onClick={logout}
                  style={{ width: "100%", textAlign: "left", border:"none", color: "#d14", fontSize:"0.8rem" }}
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}