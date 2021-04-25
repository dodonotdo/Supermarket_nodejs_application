const writesql = require("../config/writeSql");
const readSql = require("../config/readSql");
const fuv = require("../helpers/findUndefinedValues");

exports.get_item_details_root = (req, res) => {
  res.send({ success: true, message: "welcome to item details route" });
};


exports.get_item_details_data = (req, res) => {
  var query = `SELECT * FROM items_details`;
  readSql.query(query, (error, results, fields) => {
    return error == "" ? res.send({ success: true, message: "items inserted!", results }) : res.status(400).json({ success: false, message: error.code.toLowerCase() });
  });
}


exports.post_item_details_insert = (req, res) => {
  let data = req.body;
  let rData = {
    items_code: data.items_code,
    items_name: data.items_name,
    variety_name: data.variety_name,
  };

  finalDatas = fuv.findUndefinedValues(rData);
  
  if (finalDatas == "") {
    var query = `INSERT INTO items_details(items_code,items_name,variety_name) VALUES ('${rData.items_code}','${rData.items_name}','${rData.variety_name}')`;
    writesql.query(query, (error, results, fields) => {
      return  error == "" ? res.send({ success: true, message: "items inserted!", results }) : res.status(400).json({ success: false, message: error.code });
    });
  } else {
      return res.status(400).json({ success: false, message: "Bad Request" });
  }
}