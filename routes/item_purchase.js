const express = require("express");
const router = express.Router();
const writeSql = require("../config/writeSql");
const readSql = require("../config/readSql");

router.post("/insert", (req, res) => {
  let variety_code = req.body.variety_code;
  let items_name = req.body.items_name;
  let variety_name = req.body.variety_name;
  let total_kg = req.body.total_kg;
  let per_kg_amt = req.body.per_kg_amt;yyy
  var query = `INSERT INTO item_purchased(variety_code, items_name, variety_name, total_kg, per_kg_amt, total_kg_amt, per_kg_updated_amt) VALUES ('${variety_code}','${items_name}','${variety_name}','${total_kg}','${per_kg_amt}',('${per_kg_amt}'*'${total_kg}'),'${per_kg_amt}')`;
  console.log(query);
  writeSql.query(query, (error, results, fields) => {
    if (error) res.send(error);
    console.log(results);
    res.send("data inserted successfully");
  });
});

router.post("/update_rate", (req, res) => {
  let variety_code = req.body.variety_code;
  let per_kg_updated_amt = req.body.per_kg_updated_amt;
  var queryone = `UPDATE  item_purchased SET   per_kg_updated_amt='${per_kg_updated_amt}' WHERE variety_code='${variety_code}'`;
  writeSql.query(queryone, (error, results, fields) => {
    if (error) res.send(error);
    res.send("data updated successfully");
  });
});

module.exports = router;
