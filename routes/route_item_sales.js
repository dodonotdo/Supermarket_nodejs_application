const express = require("express");
const router = express.Router();

const controller_item_sales = require("../controller/controller_item_sales");

router.get("/", controller_item_sales.get_item_sales_root);

router.get("/data", controller_item_sales.get_item_sales_data);

router.post("/insert", controller_item_sales.post_item_sales_insert);


module.exports = router;
