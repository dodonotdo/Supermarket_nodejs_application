const express = require("express");
const router = express.Router();
const uploadController = require("../controller/controller_item_uploads");

router.get("/", controller_item_sales.get_item_sales_root);
router.post("/multiple-upload",  uploadController.uploadImages,  uploadController.resizeImages,  uploadController.getResult);

module.exports = router;
