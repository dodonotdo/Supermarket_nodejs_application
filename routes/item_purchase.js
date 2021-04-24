const express = require("express");
const router = express.Router();
const writeSql = require("../config/writeSql");
const readSql = require("../config/readSql");
const findUndefinedValues = require("../models/findUndefinedValues");

router.post("/insert", (req, res) => {
  let undefinedDatas = {
    variety_code: req.body.variety_code,
    items_name: req.body.items_name,
    variety_name: req.body.variety_name,
    total_kg: req.body.total_kg,
    per_kg_amt: req.body.per_kg_amt,
  };
  finaldatas = findUndefinedValues.findUndefinedValues(undefinedDatas);
  if (finaldatas == "") {
    var query = `CALL insert_into_twoTables ('${undefinedDatas.variety_code}','${undefinedDatas.items_name}','${undefinedDatas.variety_name}','${undefinedDatas.total_kg}','${undefinedDatas.per_kg_amt}')`;
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

// -----------------------------------------------------------------

router.put("/update_rate", (req, res) => {
  let datas = {
    variety_code: req.body.variety_code,
    per_kg_updated_amt: req.body.per_kg_updated_amt,
  };
  let update_rate_Datas = findUndefinedValues.findUndefinedValues(datas);
  if (update_rate_Datas == "") {
    var query = `UPDATE item_purchased SET per_kg_updated_amt='${datas.per_kg_updated_amt}' WHERE variety_code='${datas.variety_code}'`;
    writeSql.query(query, (error, results, fields) => {
      if (error) {
        res.send(error.sql);
      } else {
        res.send("data updated successfully");
      }
    });
  } else {
    res.send("Input Datas Counting Mismatched");
  }
});

// -------------------------------------------------------------------

router.post("/update", (req, res) => {
  let data = { variety_name: req.body.variety_name,
    total_kg: req.body.total_kg,
    total_kg_amt: req.body.total_kg_amt,
   };
  let updateDatas = findUndefinedValues.findUndefinedValues(data);
  if (updateDatas == "") {
    var queryOne = `SELECT total_kg,per_kg_amt FROM item_purchased WHERE variety_name ='${data.variety_name}'`;
    writeSql.query(queryOne, (error, results, fields) => {
      if (error) {
        res.send(error.sql);
      } else {
        let balance_total_kg = results[0].total_kg;
        let lastTimePurchaseAmt = results[0].per_kg_amt;
        let OldKgAmt = balance_total_kg * lastTimePurchaseAmt;
        let new_total_kg = data.total_kg + balance_total_kg;
        let combinationOldNewAmount = data.total_kg * data.total_kg_amt + OldKgAmt;
        var queryTwo = `UPDATE  item_purchased SET total_kg='${new_total_kg}',per_kg_amt='${data.total_kg_amt}', total_kg_amt='${combinationOldNewAmount}' WHERE variety_name ='${data.variety_name}'`;
        writeSql.query(queryTwo, (err, resultsTwo, fields) => {
          if (err) {
            res.send(err.sqlMessage);
          } else {
            res.send(resultsTwo);
          }
        });
      }
    });
  } else {
    res.send("Input Datas Counting Mismatched");
  }
});

// ---------------------------------------------------

router.get("/", (req, res) => {
  var query = `SELECT * FROM item_purchased`;
  readSql.query(query, (error, results, fields) => {
    if (error) {
      res.send(error.sqlMessage);
    } else {
      res.send(results);
    }
  });
});

module.exports = router;
