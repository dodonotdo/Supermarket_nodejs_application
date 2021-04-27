const writeSql = require("../config/writeSql");
const readSql = require("../config/readSql");
const fuv = require("../helpers/findUndefinedValues");

exports.get_item_details_root = (req, res) => {
  res.send({ success: true, message: "welcome to item details route" });
};


exports.get_item_details_getitemDetailsData = (req, res) => {
  var query = `SELECT * FROM items_details`;
  readSql.query(query, (error, results, fields) => {
    if (error) res.status(400).json({ success: false, message: error.code });;
    res.send({ success: true, message: "items showned!", results })
  });
}


exports.post_item_details_itemDetailsOrder = (req, res) => {
  let data = req.body;
  let rData = {
    items_code: data.items_code,
    variety_code: data.variety_code,
    items_name: data.items_name,
    variety_name: data.variety_name,
  };
  let finalDatas = fuv.strictFindUndefinedValues(rData);
  if (finalDatas == '') {
    var query = `INSERT INTO items_details(items_code,variety_code,items_name,variety_name) VALUES ('${rData.items_code}','${rData.variety_code}','${rData.items_name}','${rData.variety_name}')`;
    writeSql.query(query, (error, results, fields) => {
      if (error) res.status(400).json({ success: false, message: error.code });
      res.send({ success: true, message: "items inserted!", results: results.insertId })
    });
  }else {
      return res.status(400).json({ success: false, message: "Bad Request" });      
  }
}

exports.get_item_details_varietyDetails = (req, res) => {
  let query = `SELECT variety_code,variety_name FROM items_details`;
  readSql.query(query, (error, results, fields) => {
    if (error) res.status(400).json({ success: false, message: error.code });
    res.send({ success: true, message: "variety details showned",results });
  })
}


exports.get_item_details_itemsDetailsOnly = (req, res) => {
  let query = `SELECT items_name,items_code FROM items_details GROUP BY items_name,items_code`;
  readSql.query(query, (error, results, fields) => {
    if (error) res.status(400).json({ success: false, message: error.code });
    res.send({ success: true, message: "variety details showned",results });
  })
}


