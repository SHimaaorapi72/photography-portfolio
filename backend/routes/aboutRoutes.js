const express = require("express");
const router = express.Router();

// Endpoint to get About information (Static Data)
router.get("/", (req, res) => {
  const aboutInfo = {
    title: "About Us",
    description: "We are a photography portfolio website that showcases beautiful photographs.",
    mission: "To capture and share moments through photography.",
    vision: "To be the leading photography platform that inspires creativity.",
  };
  res.json(aboutInfo);
});

module.exports = router;
