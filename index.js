const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/public", express.static(__dirname + "/public"));
app.use("/uploads", express.static(__dirname + "/uploads"));

const route_item_purchase = require("./routes/route_item_purchase");
const route_item_sales = require("./routes/route_item_sales");
const route_item_details = require("./routes/route_item_details");
const route_item_uploads = require("./routes/route_item_uploads");


app.use("/item_purchase", route_item_purchase);
app.use("/item_sales", route_item_sales);
app.use("/item_details", route_item_details);
app.use("/item_uploads", route_item_uploads);


app.get("/", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers","X-Requested-With,content-type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/", (req, res) => {
  res.send("supermarket application designed");
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
