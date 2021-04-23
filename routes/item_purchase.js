const express = require("express");
const router = express.Router();
const writeSql = require("../config/writeSql");
const readSql = require("../config/readSql");

router.post("/insert", (req, res) => {
  let variety_code = req.body.variety_code;
  let items_name = req.body.items_name;
  let variety_name = req.body.variety_name;
  let total_kg = req.body.total_kg;
  let per_kg_amt = req.body.per_kg_amt;
  var query = `INSERT INTO item_purchased(variety_code, items_name, variety_name, total_kg, per_kg_amt, total_kg_amt, per_kg_updated_amt) VALUES ('${variety_code}','${items_name}','${variety_name}','${total_kg}','${per_kg_amt}',('${per_kg_amt}'*'${total_kg}'),'${per_kg_amt}')`;
  writeSql.query(query, (error, results, fields) => {
    if (error) res.send(error);
    console.log(results);
    res.send("data inserted successfully");
  });
});

router.put("/update_rate", (req, res) => {
  let variety_code = req.body.variety_code;
  let per_kg_updated_amt = req.body.per_kg_updated_amt;
  var query = `UPDATE  item_purchased SET   per_kg_updated_amt='${per_kg_updated_amt}' WHERE variety_code='${variety_code}'`;
  writeSql.query(query, (error, results, fields) => {
    if (error) res.send(error);
    res.send("data updated successfully");
  });
});

router.post("/update", (req, res) => {
  let variety_name = req.body.variety_name;
  // let total_kg = req.body.total_kg;
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
      if (err) res.send(err.sqlMessage);;
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
