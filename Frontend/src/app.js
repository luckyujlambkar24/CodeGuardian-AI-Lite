import React, { useState } from "react";
import axios from "axios";

function App() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!code.trim()) {
      alert("Please enter some code first!");
      return;
    }

    setLoading(true);
    setIssues([]);

    try {
      const res = await axios.post("http://localhost:5000/api/code/analyze", {
        code,
        language,
      });
      setIssues(res.data.issues);
    } catch (err) {
      console.error(err);
      alert("Error analyzing code. Check if backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>🛡️ CodeGuardian AI-Lite</h1>
      <p>Analyze your code for security and compatibility issues.</p>

      <label>Choose Language: </label>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{ margin: "10px" }}
      >
        <option value="cpp">C++</option>
        <option value="java">Java</option>
        <option value="javascript">JavaScript</option>
      </select>

      <br />
      <textarea
        rows="10"
        cols="70"
        placeholder="Paste your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{
          marginTop: "10px",
          padding: "10px",
          fontFamily: "monospace",
          fontSize: "14px",
        }}
      ></textarea>
      <br />
      <button
        onClick={handleAnalyze}
        disabled={loading}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        {loading ? "Analyzing..." : "Analyze Code"}
      </button>

      <div style={{ marginTop: "30px" }}>
        <h2>🔍 Analysis Results:</h2>
        {issues.length === 0 ? (
          <p>No issues found yet. Paste code and click Analyze.</p>
        ) : (
          <ul>
            {issues.map((issue, index) => (
              <li key={index}>
                <b>{issue.issue}</b> — {issue.explanation} ({issue.severity})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
