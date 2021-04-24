database name - supermarket_two
tables name - item_purchased, item_sales,items_details, tracking_purchased


----------
    "scripts": {
        "start": "npm run kill && nodemon app.js",
        "kill": "kill -9 $(lsof -i :3000) &>/dev/null | exit 0"
    }
----------


| ROUTE | METHOD | PARAMS |
| --------------- | --------------- | --------------- |
| / | GET | NO | 
| /item_purchase | GET | NO |
| /item_purchase/insert | POST | YES |
| /item_purchase/update_rate | PUT | YES |
| /item_purchase/update | POST | YES |
| /items_details | GET | NO | 
| /items_details/insert | POST | YES | 
| /item_sales | GET | NO | 
| /item_sales/insert | POST | YES | 

