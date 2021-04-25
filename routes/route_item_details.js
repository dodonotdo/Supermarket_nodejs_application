const express = require("express");
const router = express.Router();

const controller_item_details = require("../controller/controller_item_details");

router.get("/", controller_item_details.get_item_details_root);

router.get("/data", controller_item_details.get_item_details_data);

router.post("/insert", controller_item_details.post_item_details_insert);

module.exports = router;
