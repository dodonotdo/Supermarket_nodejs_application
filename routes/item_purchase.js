const express = require("express");
const router = express.Router();
const writeSql = require("../config/writeSql");
const readSql = require("../config/readSql");
const findUndefinedValues = require("../models/findUndefinedValues");

router.post("/insert", (req, res) => {
  const data = req.body;
  let variety_code = data.variety_code,
    items_name = data.items_name,
    variety_name = data.variety_name,
    total_kg = data.total_kg,
    per_kg_amt = data.per_kg_amt;

  let undefinedDatas = {
    variety_code,
    items_name,
    variety_name,
    total_kg,
    per_kg_amt,
  };

  finaldatas = findUndefinedValues.findUndefinedValues(undefinedDatas);

  if (finaldatas == "") {
    var query = `call insert_into_twoTables ('${variety_code}','${items_name}','${variety_name}','${total_kg}','${per_kg_amt}')`;
    writeSql.query(query, (error, results, fields) => {
      if (error) {
        res.send(error);
      } else {
        res.send("data inserted successfully");
      }
    });
  } else {
    res.sendStatus(404).send(finaldatas + "data colum is mismatch");
  }
});

router.put("/update_rate", (req, res) => {
  let variety_code = req.body.variety_code;
  let per_kg_updated_amt = req.body.per_kg_updated_amt;
  var query = `UPDATE  item_purchased SET   per_kg_updated_amt='${per_kg_updated_amt}' WHERE variety_code='${variety_code}'`;
  writeSql.query(query, (error, results, fields) => {
    if (error) {
      res.send(error.sql);
    } else {
      res.send("data updated successfully");
    }
  });
});

router.post("/update", (req, res) => {
  let variety_name = req.body.variety_name;
  var queryOne = `SELECT total_kg,per_kg_amt FROM item_purchased WHERE variety_name ='${variety_name}'`;
  writeSql.query(queryOne, (error, results, fields) => {
    if (error) res.send(error);
    let balance_total_kg = results[0].total_kg;
    let lastTimePurchaseAmt = results[0].per_kg_amt;
    let OldKgAmt = balance_total_kg * lastTimePurchaseAmt;
    let total_kg = req.body.total_kg + balance_total_kg;
    let combinationOldNewAmount = req.body.total_kg * req.body.amt + OldKgAmt;
    var queryTwo = `UPDATE  item_purchased SET total_kg='${total_kg}',per_kg_amt='${req.body.amt}', total_kg_amt='${combinationOldNewAmount}' WHERE variety_name ='${variety_name}'`;
    writeSql.query(queryTwo, (err, resultsTwo, fields) => {
      if (err) res.send(err.sqlMessage);
      res.send(resultsTwo);
    });
  });
});

router.get("/", (req, res) => {
  var query = `SELECT * FROM item_purchased`;
  readSql.query(query, (error, results, fields) => {
    if (error) res.send(error);
    res.send(results);
  });
});

module.exports = router;
