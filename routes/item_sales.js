const express = require("express");
const router = express.Router();
const writeSql = require("../config/writeSql");
const readSql = require("../config/readSql");
const findUndefinedValues = require("../models/findUndefinedValues");

router.post("/insert", (req, res) => {
  let undefinedDatas = {
    items_code: req.body.items_code,
    variety_code: req.body.variety_code,
    items_name: req.body.items_name,
    variety_name: req.body.variety_name,
    items_kg: req.body.items_kg,
  };
  finaldatas = findUndefinedValues.findUndefinedValues(undefinedDatas);
  if (finaldatas == "") {
    var queryOne = `call datas('${undefinedDatas.variety_code}', '${undefinedDatas.items_code}', '${undefinedDatas.items_name}', '${undefinedDatas.variety_name}', ${undefinedDatas.items_kg})`;
    writeSql.query(queryOne, (error, results, fields) => {
      if (error) {
        res.send(error.sql);
      } else {
        res.send("data inserted successfully");
      }
    });
  } else {
    res.send("Input Datas Counting Mismatched");
  }
});

// --------------------------------------------------------------------------

router.get("/", (req, res) => {
  var queryOne = `SELECT * FROM item_sales`;
  readSql.query(queryOne, (error, results, fields) => {
    if (error) {
      res.sendStatus(404);
    } else {
      res.send(results);
    }
  });
});

module.exports = router;
