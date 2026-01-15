import { useState } from "react";

export default function InputCard({ onAnalyze }) {
  const [complaint, setComplaint] = useState("");
  const [urgency, setUrgency] = useState("medium");
  const [service, setService] = useState("electricity");

  return (
    <div style={{
      margin: "40px",
      padding: "30px",
      borderRadius: "16px",
      background: "rgba(255,255,255,0.05)",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(255,255,255,0.1)",
      maxWidth: "600px"
    }}>
      <h2 style={{ color: "#e5e7eb" }}>Analyze Complaint</h2>

      <textarea
        placeholder="Describe the issue..."
        value={complaint}
        onChange={(e) => setComplaint(e.target.value)}
        style={inputStyle(true)}
      />

      <select value={urgency} onChange={(e) => setUrgency(e.target.value)} style={inputStyle()}>
        <option>low</option>
        <option>medium</option>
        <option>high</option>
      </select>

      <select value={service} onChange={(e) => setService(e.target.value)} style={inputStyle()}>
        <option>electricity</option>
        <option>water</option>
        <option>gas</option>
      </select>

      <button
        onClick={() => onAnalyze({ complaint, urgency, service })}
        style={buttonStyle}
      >
        Analyze Priority
      </button>
    </div>
  );
}

const inputStyle = (large = false) => ({
  width: "100%",
  padding: large ? "14px" : "10px",
  marginBottom: "14px",
  borderRadius: "10px",
  border: "none",
  outline: "none",
  background: "#020617",
  color: "#e5e7eb"
});

const buttonStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  background: "linear-gradient(90deg,#6366f1,#a855f7)",
  border: "none",
  color: "white",
  fontWeight: "600",
  cursor: "pointer"
};
