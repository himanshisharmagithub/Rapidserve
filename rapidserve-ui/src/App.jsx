import { useState } from "react";

export default function App() {
  const [complaint, setComplaint] = useState("");
  const [urgency, setUrgency] = useState("medium");
  const [service, setService] = useState("electricity");
  const [address, setAddress] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzePriority = async () => {
    if (!complaint.trim() || !address.trim()) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          complaint_text: complaint,
          user_urgency: urgency,
          service_type: service,
          address: address,
        }),
      });

      if (!res.ok) throw new Error("Backend error");

      const data = await res.json();
      setResult(data.predicted_priority);
    } catch {
      setError("Backend not responding");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl p-8">

        <h1 className="text-3xl font-bold text-center">RapidServe AI</h1>
        <p className="text-center text-slate-400 mt-2">
          Smart Emergency Priority Assessment
        </p>

        <div className="mt-8 space-y-4">
          <textarea
            className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3"
            placeholder="Describe the issue…"
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
          />

          <input
            className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3"
            placeholder="Full address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <select
              className="bg-slate-800 border border-slate-600 rounded-lg p-3"
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
            >
              <option value="low">Low urgency</option>
              <option value="medium">Medium urgency</option>
              <option value="high">High urgency</option>
            </select>

            <select
              className="bg-slate-800 border border-slate-600 rounded-lg p-3"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <option value="electricity">Electricity</option>
              <option value="water">Water</option>
              <option value="internet">Internet</option>
              <option value="gas">Gas</option>
            </select>
          </div>

          <button
            onClick={analyzePriority}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 rounded-lg py-3 font-semibold disabled:opacity-50"
          >
            {loading ? "Analyzing…" : "Analyze Priority"}
          </button>

          {result && (
            <div className="text-center mt-6">
              <p className="text-slate-400">Predicted Priority</p>
              <p className="text-2xl font-bold text-green-400 uppercase">
                {result}
              </p>
            </div>
          )}

          {error && <p className="text-red-400 text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
}
