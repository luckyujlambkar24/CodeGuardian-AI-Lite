const analyzeCode = (req, res) => {
  const { code, language } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: "Code and language are required" });
  }

  // Temporary mock analysis
  const issues = [
    { line: 10, issue: "Unused variable", severity: "Low" },
    { line: 22, issue: "Potential memory leak", severity: "High" }
  ];

  res.json({
    message: "Code analysis completed successfully.",
    language,
    issues
  });
};

module.exports = { analyzeCode };
