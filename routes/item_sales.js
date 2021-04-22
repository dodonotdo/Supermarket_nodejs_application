const express = require("express");
const router = express.Router();
const writeSql = require("../config/writeSql");
const readSql = require("../config/readSql");

router.post("/insert", (req, res) => {
  let items_code = req.body.items_code;
  let variety_code = req.body.variety_code;
  let items_name = req.body.items_name;
  let variety_name = req.body.variety_name;
  let items_kg = req.body.items_kg;
  var queryOne = `call datas('${variety_code}', '${items_code}', '${items_name}', '${variety_name}', ${items_kg})`;
  readSql.query(queryOne, (error, results, fields) => {
    if (error) res.send(error);

    res.send("datas")
    // call datas('RC0R1', 'RC001', 'rice', 'rnr', 10);
  });
});

// router.post("/", (req, res) => {
//   let items_code = req.body.items_code;
//   let variety_code = req.body.variety_code;
//   let items_name = req.body.items_name;
//   let variety_name = req.body.variety_name;
//   let items_kg = req.body.items_kg;
//   let per_kg_amt = req.body.per_kg_amt;
//   var queryOne = `SELECT total_kg,per_kg_updated_amt FROM item_purchased WHERE variety_code = '${variety_code}'`;
//   readSql.query(queryOne, (error, results, fields) => {
//     if (error) res.send(error);
// let total_kg = results[0].total_kg - items_kg;
// let per_kg_amt = results[0].per_kg_updated_amt
//     res.send({
//       total_kg: results[0].total_kg,
//       per_kg_updated_amt: results[0].per_kg_updated_amt
//     });
//     let 
//   });
// });
module.exports = router;

