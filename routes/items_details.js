const express = require("express");
const router = express.Router();
const writesql = require("../config/writeSql");
const readsql = require("../config/readSql");

router.post("/insert", (req, res) => {
  let items_code = req.body.items_code;
  let items_name = req.body.items_name;
  let total_kg = req.body.total_kg;
  let query = `INSERT INTO items_details(items_code,items_name,total_kg) VALUES ('${items_code}','${items_name}','${total_kg}')`;
  writesql.query(query, (error, results, fields) => {
    if (error) res.send(error);
    res.end("data inserted");
  });
  // router.post('/insert',  (req, res) => {
  //   var postData = req.body;
  //   var query = "INSERT INTO item_purchase SET ?"
  //   writesql.query(query,postData, (error, results, fields) => {
  //     if (error) throw error;
  //     res.end('data inserted successfully');
  //   });
  // });
});

module.exports = router;
