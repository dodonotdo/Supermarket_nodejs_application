const express = require("express");
const router = express.Router();

const controller_item_purchase = require("../controller/controller_item_purchase");

router.get("/", controller_item_purchase.get_item_purchase_root);

router.get("/data", controller_item_purchase.get_item_purchase_data);

router.get("/insert", controller_item_purchase.post_item_purchase_insert);

router.get("/update_rate", controller_item_purchase.post_item_purchase_update_rate);

router.get("/update", controller_item_purchase.post_item_purchase_update);

module.exports = router;
