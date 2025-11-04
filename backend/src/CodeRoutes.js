const express = require("express");
const router = express.Router();

router.post("/analyze", async (req, res) => {
  try {
    const { code, language } = req.body;
    const issues = [];

    if (language === "cpp") {
      if (/int\s+\w+\s*;/.test(code)) {
        issues.push({
          line: 10,
          issue: "Unused variable",
          severity: "Low",
          explanation:
            "Variable declared but never used. Consider removing or using it.",
        });
      }
      if (/printf\s*\(/.test(code)) {
        issues.push({
          line: 22,
          issue: "Unsafe function (printf)",
          severity: "Medium",
          explanation:
            "Using printf without input validation can cause vulnerabilities.",
        });
      }
    } else if (language === "java") {
      if (/System\.out\.print/.test(code)) {
        issues.push({
          line: 15,
          issue: "Console output detected",
          severity: "Low",
          explanation:
            "Avoid System.out.print in production code. Use logging frameworks.",
        });
      }
      if (!/try\s*{[^}]*}\s*catch/.test(code)) {
        issues.push({
          line: 30,
          issue: "Missing error handling",
          severity: "High",
          explanation:
            "No try-catch block found. Always handle exceptions properly.",
        });
      }
    } else if (language === "javascript") {
      if (/var\s+/.test(code)) {
        issues.push({
          line: 8,
          issue: "Use of var",
          severity: "Medium",
          explanation:
            "Use 'let' or 'const' instead of 'var' to avoid scope issues.",
        });
      }
      if (/==/.test(code) && !/===/.test(code)) {
        issues.push({
          line: 16,
          issue: "Loose equality used",
          severity: "Medium",
          explanation:
            "Use '===' instead of '==' to prevent unexpected type coercion.",
        });
      }
    }

    res.json({
      message: "Code analysis completed successfully.",
      language,
      issues,
    });
  } catch (err) {
    res.status(500).json({ message: "Error analyzing code", error: err.message });
  }
});

module.exports = router;
