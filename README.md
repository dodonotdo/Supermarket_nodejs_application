database name - supermarket_two
tables name - item_purchased, item_sales,items_details, tracking_purchased


----------
    "scripts": {
        "start": "npm run kill && nodemon app.js",
        "kill": "kill -9 $(lsof -i :3000) &>/dev/null | exit 0"
    }
----------