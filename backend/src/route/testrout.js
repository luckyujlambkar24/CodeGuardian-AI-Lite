const express = require("express");
const router = express.Router();

// GET route - simple test
router.get("/", (req, res) => {
  res.json({
    message: "✅ Test route working successfully!",
    project: "CodeGuardian AI-Lite"
  });
});

module.exports = router;
