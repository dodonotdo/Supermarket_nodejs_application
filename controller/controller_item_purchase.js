const writeSql = require("../config/writeSql");
const readSql = require("../config/readSql");
const fuv = require("../helpers/findUndefinedValues");

get_item_purchase_root = (req, res) => {
  res.send({ success: true, message: "welcome to purchase route!" });
};

get_item_purchase_getPurchaseData = (req, res) => {
  let query = `SELECT * FROM item_purchased`;
  readSql.query(query, (error, results, fields) => {
    if (error) res.status(400).json({ success: false, message: error.code });
    res.send({ success: true, message: "purchase items showned!", results });
  });
};

post_item_purchase_purchaseOrder = (req, res) => {
  let data = req.body;
  let rData = {
    variety_code: data.variety_code,
    items_name: data.items_name,
    variety_name: data.variety_name,
    total_kg: data.total_kg,
    per_kg_amt: data.per_kg_amt,
  };
  finaldatas = fuv.strictFindUndefinedValues(rData);
  if (finaldatas == "") {
    var query = `CALL insert_into_twoTables ('${rData.variety_code}','${rData.items_name}','${rData.variety_name}','${rData.total_kg}','${rData.per_kg_amt}')`;
    writeSql.query(query, (error, results, fields) => {
      if (error) res.status(400).json({ success: false, message: error.code });
      res.send({ success: true, message: "items inserted!", results });
    });
  } else {
    return res.status(400).json({ success: false, message: "Bad request" });
  }
};

post_item_purchase_update_rate = (req, res) => {
  let data = req.body;
  let rData = {
    variety_code: data.variety_code,
    per_kg_updated_amt: data.per_kg_updated_amt,
  };
  let update_rate_Datas = fuv.strictFindUndefinedValues(rData);
  if (update_rate_Datas == "") {
    var query = `UPDATE item_purchased SET per_kg_updated_amt='${rData.per_kg_updated_amt}' WHERE variety_code='${rData.variety_code}'`;
    writeSql.query(query, (error, results, fields) => {
      if (error) res.status(400).json({ success: false, message: error.code });
      res.send({ success: true, message: "items rate updated!", results });
    });
  } else {
    return res.status(400).json({ success: false, message: "Bad request" });
  }
};

post_item_purchase_update = (req, res) => {
  let data = req.body;
  let rData = {
    variety_name: data.variety_name,
    total_kg: data.total_kg,
    total_kg_amt: data.total_kg_amt,
  };
  let updateDatas = fuv.strictFindUndefinedValues(rData);
  if (updateDatas == "") {
    var queryOne = `SELECT total_kg,per_kg_amt FROM item_purchased WHERE variety_name ='${rData.variety_name}'`;
    writeSql.query(queryOne, (error, results, fields) => {
      if (error) return res.send(error.sql);
      let balance_total_kg = results[0].total_kg,
        lastTimePurchaseAmt = results[0].per_kg_amt,
        OldKgAmt = balance_total_kg * lastTimePurchaseAmt,
        new_total_kg = data.total_kg + balance_total_kg,
        combinationOldNewAmount = data.total_kg * data.total_kg_amt + OldKgAmt;
      let queryTwo = `UPDATE  item_purchased SET total_kg='${new_total_kg}',per_kg_amt='${data.total_kg_amt}', total_kg_amt='${combinationOldNewAmount}' WHERE variety_name ='${data.variety_name}'`;
      writeSql.query(queryTwo, (err, resultsTwo, fields) => {
        if (err) res.status(400).json({ success: false, message: err.code });
        res.send({
          success: true,
          message: "items details updated!",
          resultsTwo,
        });
      });
    });
  } else {
    return res.status(400).json({ success: false, message: "Bad Requests" });
  }
};

post_item_purchase_balanceDetails = (req, res) => {
  let data = req.body;
  var rData = { variety_name: data.variety_name };
  let remainingDatas = fuv.strictFindUndefinedValues(rData);
  if (remainingDatas == "") {
    var queryOne = `SELECT variety_code, items_name, variety_name ,total_kg AS balance_kg FROM item_purchased WHERE variety_name = '${rData.variety_name}'`;
    writeSql.query(queryOne, (errorOne, resultsOne, fields) => {
      if (errorOne) res.status(400).json({ success: false, message: errorOne });
      res.send({
        success: true,
        message: "per items remaining_kg showned!",
        resultsOne,
      });
    });
  } else {
    var queryTwo = `SELECT variety_code, items_name, variety_name ,total_kg AS balance_kg FROM item_purchased;`;
    writeSql.query(queryTwo, (errorTwo, resultsTwo, fields) => {
      if (errorTwo) res.status(400).json({ success: false, message: errorTwo });
      res.send({
        success: true,
        message: "all items remaining_kgs showned!",
        resultsTwo,
      });
    });
  }
};

module.exports = {
  get_item_purchase_root,
  get_item_purchase_getPurchaseData,
  post_item_purchase_purchaseOrder,
  post_item_purchase_update_rate,
  post_item_purchase_update,
  post_item_purchase_balanceDetails,
};
