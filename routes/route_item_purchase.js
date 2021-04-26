const express = require("express");
const router = express.Router();

const controller_item_purchase = require("../controller/controller_item_purchase");

router.get("/", controller_item_purchase.get_item_purchase_root);

router.get("/getPurchaseData", controller_item_purchase.get_item_purchase_getPurchaseData);

router.post("/purchaseOrder", controller_item_purchase.post_item_purchase_purchaseOrder);

router.post("/update_rate", controller_item_purchase.post_item_purchase_update_rate);

router.post("/update", controller_item_purchase.post_item_purchase_update);

router.post("/balanceDetails", controller_item_purchase.post_item_purchase_balanceDetails);

module.exports = router;
