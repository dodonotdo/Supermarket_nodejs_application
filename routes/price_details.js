const express = require("express");
const router = express.Router();
const writesql = require("../config/writesql");
const readsql = require("../config/readsql");

router.post("/insert", (req, res) => {
  var postData = req.body;
  console.log(postData);
  var query = "INSERT INTO price_details SET ?";
  writesql.query(query, postData, (error, results, fields) => {
    if (error) throw error;
    res.end("data inserted successfully");
  });
});

router.get("/", (req, res) => {
  var query = `SELECT * FROM price_details`;
  readsql.query(query, (error, results, fields) => {
    if (error) res.send(error);
    res.end(JSON.stringify(results));
  });
});

module.exports = router;
