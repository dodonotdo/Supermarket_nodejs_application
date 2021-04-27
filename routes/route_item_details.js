const express = require("express");
const router = express.Router();

const controller_item_details = require("../controller/controller_item_details");

router.get("/", controller_item_details.get_item_details_root);

router.get("/getitemDetailsData", controller_item_details.get_item_details_getitemDetailsData);

router.get("/itemsDetailsOnly", controller_item_details.get_item_details_itemsDetailsOnly);

router.get("/varietyDetails", controller_item_details.get_item_details_varietyDetails);

router.post("/itemDetailsOrder", controller_item_details.post_item_details_itemDetailsOrder);


module.exports = router;
