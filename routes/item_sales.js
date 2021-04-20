const express = require("express");
const router = express.Router();
const writesql = require("../config/writesql");
const readsql = require("../config/readsql");

router.post("/insert", (req, res) => {
  let items_code = req.body.items_code;
  let items = req.body.items;
  let category = req.body.category;
  let item_kg = req.body.item_kg;
  let per_item_amt = req.body.per_item_amt;

  queryOne = `call get_data('${items_code}','${items}','${category}','${item_kg}','${per_item_amt}')`;
  writesql.query(queryOne, (error, results, fields) => {
    if (error) throw error;
    res.send(results);
  });
});

module.exports = router;

