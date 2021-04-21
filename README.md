database name - supermarket
tables name - item_purchase, item_sales, price_details


----------
    "scripts": {
        "start": "npm run kill && nodemon app.js",
        "kill": "kill -9 $(lsof -i :3000) &>/dev/null | exit 0"
    }
----------