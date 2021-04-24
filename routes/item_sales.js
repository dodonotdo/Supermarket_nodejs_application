const express = require("express");
const router = express.Router();
const writeSql = require("../config/writeSql");
const readSql = require("../config/readSql");
const fuv = require("../helpers/findUndefinedValues");

router.get("/", (req, res) => {
  var queryOne = `SELECT * FROM item_sales`;
  readSql.query(queryOne, (error, results, fields) => {
    error == "" ? res.send({ success: true, message: "items listed!", results }) : res.status(400).json({ success: false, message: error.code });
  });
});

router.post("/insert", (req, res) => {
  let data = req.body;
  let rData = {
    items_code: data.items_code,
    variety_code: data.variety_code,
    items_name: data.items_name,
    variety_name: data.variety_name,
    items_kg: data.items_kg,
  };

  finaldatas = fuv.findUndefinedValues(rData);

  if (finaldatas == "") {
    var queryOne = `call datas('${rData.variety_code}', '${rData.items_code}', '${rData.items_name}', '${rData.variety_name}', ${rData.items_kg})`;
    writeSql.query(queryOne, (error, results, fields) => {
      return  error == "" ? res.send({ success: true, message: "items inserted!", results }) : res.status(400).json({ success: false, message: error.code });
    });
  } else {
    return res.status(400).json({ success: false, message: "order not found!" });
  }
});

module.exports = router;
