const writeSql = require("../config/writeSql");
const readSql = require("../config/readSql");
const fuv = require("../helpers/findUndefinedValues");



exports.get_item_sales_root = (req, res) => {
    res.send({ success: true, message: "welcome to sales route" });
};


exports.get_item_sales_data = (req, res) => {
    var queryOne = `SELECT * FROM item_sales`;
    readSql.query(queryOne, (error, results, fields) => {
      if (error) res.status(400).json({ success: false, message: error.code });;
      res.send({ success: true, message: "items inserted!", results })
  });
}

exports.post_item_sales_insert = (req, res) => {
    let data = req.body;
    let rData = {
      items_code: data.items_code,
      variety_code: data.variety_code,
      items_name: data.items_name,
      variety_name: data.variety_name,
      items_kg: data.items_kg,
    };

    finaldatas = fuv.strictFindUndefinedValues(rData);
  
    if (finaldatas == "") {
      var queryOne = `call datas('${rData.variety_code}', '${rData.items_code}', '${rData.items_name}', '${rData.variety_name}', ${rData.items_kg})`;
      writeSql.query(queryOne, (error, results, fields) => {
        if (error) res.status(400).json({ success: false, message: error.code });
        res.send({ success: true, message: "items inserted!", results })    
      });
    } else {
        return res.status(400).json({ success: false, message: "Bad Request!" });
    }
  }