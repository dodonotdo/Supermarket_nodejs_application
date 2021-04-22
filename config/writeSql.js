const mysql = require("mysql");

const config = {
  host: "localhost",
  user: "user",
  password: "Password@123",
  database: "supermarket_two",
  dateStrings: true,
  debug: false,
};

var writeConnection = mysql.createPool(config);
module.exports = writeConnection;
