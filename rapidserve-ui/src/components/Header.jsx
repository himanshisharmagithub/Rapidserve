export default function Header() {
  return (
    <header style={{
      padding: "24px 40px",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
      display: "flex",
      flexDirection: "column",
      gap: "6px"
    }}>
      <h1 style={{ margin: 0, fontSize: "28px", color: "#e5e7eb" }}>
        RapidServe AI
      </h1>
      <p style={{ margin: 0, color: "#94a3b8" }}>
        Intelligent Priority & Risk Assessment System
      </p>
    </header>
  );
}
