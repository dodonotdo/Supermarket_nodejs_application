const express = require("express");
const cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const route_item_purchase = require("./routes/route_item_purchase");
const route_item_sales = require("./routes/route_item_sales");
const route_items_details = require("./routes/route_items_details");

app.use("/item_purchase", route_item_purchase);
app.use("/item_sales", route_item_sales);
app.use("/items_details", route_items_details);

app.get("/", async (req, res) => {
  await res.send("supermarket application designed");
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
