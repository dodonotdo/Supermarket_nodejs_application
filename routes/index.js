const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("supermarket_two application designed");
});

module.exports = router;
