const express = require("express");
const router = express.Router();

const controller_item_sales = require("../controller/controller_item_sales");

router.get("/", controller_item_sales.get_item_sales_root);

router.get("/getSalesData", controller_item_sales.get_item_sales_getSalesData);

router.post("/salesOrder", controller_item_sales.post_item_sales_salesOrder);


module.exports = router;
