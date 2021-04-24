const express = require("express");
const router = express.Router();
const writesql = require("../config/writeSql");
const readSql = require("../config/readSql");
const fuv = require("../helpers/findUndefinedValues");


router.get("/", (req, res) => {
  res.send({ success: true, message: "items inserted!" })
});

router.get("/data", (req, res) => {
  var query = `SELECT * FROM items_details`;
  readSql.query(query, (error, results, fields) => {
    return error == "" ? res.send({ success: true, message: "items inserted!", results }) : res.status(400).json({ success: false, message: error.code.toLowerCase() });
  });
});

router.post("/insert", (req, res) => {
  let data = req.body;
  let undefinedDatas = {
    items_code: data.items_code,
    items_name: data.items_name,
    variety_name: data.variety_name,
  };

  finalDatas = fuv.findUndefinedValues(undefinedDatas);
  
  if (finalDatas == "") {
    var query = `INSERT INTO items_details(items_code,items_name,variety_name) VALUES ('${undefinedDatas.items_code}','${undefinedDatas.items_name}','${undefinedDatas.variety_name}')`;
    writesql.query(query, (error, results, fields) => {
      return  error == "" ? res.send({ success: true, message: "items inserted!", results }) : res.status(400).json({ success: false, message: error.code });
    });
  } else {
      return res.status(400).json({ success: false, message: "order not found!" });
  }
});

module.exports = router;
