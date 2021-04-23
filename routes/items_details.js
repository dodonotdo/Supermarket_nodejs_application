const express = require("express");
const router = express.Router();
const writesql = require("../config/writeSql");
const readSql = require("../config/readSql");

router.post("/insert", (req, res) => {
  let items_code = req.body.items_code;
  let items_name = req.body.items_name;
  let variety_name = req.body.variety_name;
  if(items_code !== undefined && items_name !== undefined && variety_name !== undefined){
  var query = `INSERT INTO items_details(items_code,items_name,variety_name) VALUES ('${items_code}','${items_name}','${variety_name}')`;
  }else {
    res.send('input missing')
  }
  writesql.query(query, (error, results, fields) => {
    if (error) res.send(error);
    res.end("data inserted");
  });
});

router.get("/", (req, res) => {
  var query = `SELECT * FROM items_details`;
  readSql.query(query, (error,results, fields)=>{
    if (error) res.send(error);
    res.send(results);
  })
})

module.exports = router;
