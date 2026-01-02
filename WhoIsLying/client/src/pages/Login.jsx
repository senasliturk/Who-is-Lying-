import { useState } from "react";
import { API_BASE } from "../config"; 
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("sena@test.com");
  const [password, setPassword] = useState("sena1234");
  const [msg, setMsg] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setMsg("");

    const r = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await r.json().catch(() => ({}));
    if (!r.ok) return setMsg(data.message || "Login failed!");

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    window.dispatchEvent(new Event("auth-changed"));
    
    nav("/", {replace:true});
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
      <div className="glass-card" style={{ width: "100%", maxWidth: 400, background: "rgba(0,0,0,0.85)" }}>
        <h2 style={{ textAlign: "center", marginBottom: 20, color: "#c0c0c0" }}>DETECTIVE LOGIN</h2>
        
        <form onSubmit={onSubmit} style={{ display: "grid", gap: 16 }}>
          <div>
            <label style={{ display: "block", marginBottom: 6, fontSize: "0.8rem", color:"#888", textTransform:"uppercase" }}>Email Address</label>
            <input 
              style={{ width: "100%", boxSizing: "border-box" }}
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your ID..." 
            />
          </div>
          
          <div>
            <label style={{ display: "block", marginBottom: 6, fontSize: "0.8rem", color:"#888", textTransform:"uppercase" }}>Password</label>
            <input 
              style={{ width: "100%", boxSizing: "border-box" }}
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••" 
              type="password" 
            />
          </div>

          <button type="submit" style={{ marginTop: 10, padding: 14 }}>ACCESS SYSTEM</button>
        </form>

        {msg && (
          <div style={{ 
            marginTop: 20, 
            padding: 10, 
            background: "rgba(100,0,0,0.3)", 
            border: "1px solid rgba(255,0,0,0.3)", 
            color: "#ff8888",
            fontSize: "0.9rem",
            textAlign: "center"
          }}>
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}