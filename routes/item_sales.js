const express = require("express");
const router = express.Router();
const writeSql = require("../config/writeSql");
const readSql = require("../config/readSql");

// router.post("/insert", (req, res) => {
//   let items_code = req.body.items_code;
//   let variety_code = req.body.variety_code;
//   let items_name = req.body.items_name;
//   let variety_name = req.body.variety_name;
//   let items_kg = req.body.items_kg;
//   let per_kg_amt = req.body.per_kg_amt;
//   var queryOne = `SELECT total_kg,per_kg_updated_amt FROM item_purchased WHERE variety_code = '${variety_code}'`;
//   readSql.query(queryOne, (error, results, fields) => {
//     if (error) res.send(error);
//     console.log(results[0].total_kg);
//     let balance_kg = results[0].total_kg - items_kg;
//     var queryTwo = `INSERT INTO item_sales(items_code,variety_code,items_name,variety_name,items_kg,per_kg_amt,total_kg_amt, balance_kg) values ('${items_code}','${variety_code}','${items_name}','${variety_name}','${items_kg}','${per_kg_amt}',('${items_kg}'*'${per_kg_amt}'),'${balance_kg}')`;
//     writeSql.query(queryTwo, (error, results, fields) => {
//       if (error) res.send(error);
//       console.log(results);
//       let queryThree = ` UPDATE item_purchased SET total_kg = '${balance_kg}' WHERE  variety_name='${variety_name}'`;
//       writeSql.query(queryThree, (error, results, fields) => {
//         if (error) res.send(error);
//         let query = `SELECT total_kg FROM items_details WHERE items_name = '${items_name}' `;
//         readSql.query(query, (error, results, fields) => {
//           if (error) res.send(error);
//           let total_kg = results[0].total_kg - items_kg;
//           let queryFour = ` UPDATE items_details SET total_kg = '${total_kg}' WHERE  items_name='${items_name}'`;
//           writeSql.query(queryFour, (error, results, fields) => {
//             if (error) res.send(error);
//             res.send(results);
//           });
//         });
//       });
//     });


//   });
// });

router.post("/", (req, res) => {
  let items_code = req.body.items_code;
  let variety_code = req.body.variety_code;
  let items_name = req.body.items_name;
  let variety_name = req.body.variety_name;
  let items_kg = req.body.items_kg;
  let per_kg_amt = req.body.per_kg_amt;
  var queryOne = `SELECT total_kg,per_kg_updated_amt FROM item_purchased WHERE variety_code = '${variety_code}'`;
  readSql.query(queryOne, (error, results, fields) => {
    if (error) res.send(error);
    console.log(results[0].per_kg_updated_amt);
    res.send(results[0].per_kg_updated_amt);
    let 
  });
});
module.exports = router;

