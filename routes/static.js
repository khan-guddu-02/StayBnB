// routes/static.js
const express = require("express");
const router = express.Router();

router.get("/privacy", (req, res) => {
  res.render("statics/privacy");
});

router.get("/terms", (req, res) => {
  res.render("statics/terms");
});

router.get("/contact", (req, res) => {
  res.render("statics/contact");
});

module.exports = router;