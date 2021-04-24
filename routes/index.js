const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  await res.send("supermarket application designed");
});

module.exports = router;
