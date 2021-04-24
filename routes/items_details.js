const express = require("express");
const router = express.Router();
const writesql = require("../config/writeSql");
const readSql = require("../config/readSql");
const findUndefinedValues = require("../models/findUndefinedValues");

router.post("/insert", (req, res) => {
  let undefinedDatas = {
    items_code: req.body.items_code,
    items_name: req.body.items_name,
    variety_name: req.body.variety_name,
  };
  finaldatas = findUndefinedValues.findUndefinedValues(undefinedDatas);
  if (finaldatas == "") {
    var query = `INSERT INTO items_details(items_code,items_name,variety_name) VALUES ('${undefinedDatas.items_code}','${undefinedDatas.items_name}','${undefinedDatas.variety_name}')`;
    writesql.query(query, (error, results, fields) => {
      if (error) res.send(error);
      res.end("data inserted");
    });
  } else {
    res.send("Input Datas Counting Mismatched");
  }
});

router.get("/", (req, res) => {
  var query = `SELECT * FROM items_details`;
  readSql.query(query, (error, results, fields) => {
    if (error) {
      res.send(error.sqlMessage);
    } else {
      res.send(results);
    }
  });
});

module.exports = router;
