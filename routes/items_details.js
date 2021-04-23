const express = require("express");
const router = express.Router();
const writesql = require("../config/writeSql");

router.post("/insert", (req, res) => {
  let items_code = req.body.items_code;
  let items_name = req.body.items_name;
  let variety_name = req.body.variety_name;
  let query = `INSERT INTO items_details(items_code,items_name,variety_name) VALUES ('${items_code}','${items_name}','${variety_name}')`;
  writesql.query(query, (error, results, fields) => {
    if (error) res.send(error);
    res.end("data inserted");
  });
});

module.exports = router;
