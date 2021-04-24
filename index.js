const express = require("express");
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const item_purchase = require("./routes/item_purchase");
const item_sales = require("./routes/item_sales");
const items_details = require("./routes/items_details");
const index = require("./routes/index");

app.use("/", index);
app.use("/item_purchase", item_purchase);
app.use("/item_sales", item_sales);
app.use("/items_details", items_details);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});


