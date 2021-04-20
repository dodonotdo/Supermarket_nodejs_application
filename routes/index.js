const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("supermarket application designed");
});

module.exports = router;
