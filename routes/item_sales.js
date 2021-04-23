const express = require("express");
const router = express.Router();
const writeSql = require("../config/writeSql");
const readSql = require("../config/readSql");

router.post("/insert", (req, res) => {
  let items_code = req.body.items_code;
  let variety_code = req.body.variety_code;
  let items_name = req.body.items_name;
  let variety_name = req.body.variety_name;
  let items_kg = req.body.items_kg;
  var queryOne = `call datas('${variety_code}', '${items_code}', '${items_name}', '${variety_name}', ${items_kg})`;
  writeSql.query(queryOne, (error, results, fields) => {
    if (error) res.send(error);
    res.send("data inserted successfully");
  });
});

router.get("/", (req, res) => {
  var queryOne = `SELECT * FROM item_sales`;
  readSql.query(queryOne, (error, results, fields) => {
    if (error) res.send(error);
    res.send(results);
  });
});

module.exports = router;
