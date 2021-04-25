const writesql = require("../config/writeSql");
const readSql = require("../config/readSql");
const fuv = require("../helpers/findUndefinedValues");

exports.get_item_purchase_root = (req, res) => {
    return res.send({ success: true, message: "welcome to purchase route!" });
};

exports.get_item_purchase_data = (req, res) => {
    let query = `SELECT * FROM item_purchased`;
    readSql.query(query, (error, results, fields) => {
      return error == "" ? res.send({ success: true, message: "order inserted!", results }) : res.status(400).json({ success: false, message: error.code });
    });
  }

/* post_item_purchase_insert */
exports.post_item_purchase_insert = (req, res) => {
    let data = req.body;
    let rData = {
      variety_code: data.variety_code,
      items_name: data.items_name,
      variety_name: data.variety_name,
      total_kg: data.total_kg,
      per_kg_amt: data.per_kg_amt,
    };
  
    finaldatas = fuv.findUndefinedValues(rData);
    if (finaldatas == "") {
      var query = `CALL insert_into_twoTables ('${rData.variety_code}','${rData.items_name}','${rData.variety_name}','${rData.total_kg}','${rData.per_kg_amt}')`;
      writeSql.query(query, (error, results, fields) => {
        return error == "" ? res.send({ success: true, message: "order inserted!", results }) : res.status(400).json({ success: false, message: error.code });
      });
    } else {
        return res.status(404).json({ success: false, message: "Bad request" });
    }
  }

exports.post_item_purchase_update_rate = (req, res) => {
    let data = req.body;
    let rData = {
      variety_code: data.variety_code,
      per_kg_updated_amt: data.per_kg_updated_amt,
    };
  
    let update_rate_Datas = fuv.findUndefinedValues(rData);
    if (update_rate_Datas == "") {
      var query = `UPDATE item_purchased SET per_kg_updated_amt='${rData.per_kg_updated_amt}' WHERE variety_code='${rData.variety_code}'`;
      writeSql.query(query, (error, results, fields) => {
        return error == "" ? res.send({ success: true, message: "order inserted!", results }) : res.status(400).json({ success: false, message: error.code });
      });
    } else {
        return res.status(404).json({ success: false, message: "Bad request" });
    }
  } 

exports.post_item_purchase_update = (req, res) => {
    let data = req.body;
    let rData = {
      variety_name: req.body.variety_name,
      total_kg: req.body.total_kg,
      total_kg_amt: req.body.total_kg_amt,
    };
    let updateDatas = fuv.findUndefinedValues(rData);
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
          return error == "" ? res.send({ success: true, message: "order inserted!", results }) : res.status(400).json({ success: false, message: error.code });
        });
  
      });
    } else {
        return res.status(404).json({ success: false, message: "Bad Requests" });
    }
  }