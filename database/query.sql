-- table creation
CREATE TABLE items_details (
    items_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    items_code VARCHAR(255) NOT NULL,
    items_name VARCHAR(255) NOT NULL,
    variety_name VARCHAR(255) NOT NULL
);

CREATE TABLE item_purchased (
    purchase_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    variety_code VARCHAR(255) NOT NULL,
    items_name VARCHAR(255) NOT NULL,
    variety_name VARCHAR(255) NOT NULL,
    total_kg INT(10) NOT NULL,
    per_kg_amt INT(10) NOT NULL,
    total_kg_amt INT NOT NULL,
    per_kg_updated_amt INT ,
    total_kg_updated_amt INT,
    updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE tracking_purchased(
    purchase_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,   
    variety_code VARCHAR(255) NOT NULL,
    items_name VARCHAR(255) NOT NULL,
    variety_name VARCHAR(255) NOT NULL,    
    total_kg INT NOT NULL,    
    per_kg_amt INT NOT NULL,
    total_kg_amt INT NOT NULL
   
);

CREATE TABLE item_sales (
    sales_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    items_code VARCHAR(255) NOT NULL,
    variety_code VARCHAR(255) NOT NULL,
    items_name VARCHAR(255) NOT NULL,
    variety_name VARCHAR(255) NOT NULL,
    items_kg INT NOT NULL,
    per_kg_amt INT NOT NULL,
    total_kg_amt INT NOT NULL,
    balance_kg INT
);

-- UPDATE


UPDATE
    item_purchased
SET
    total_kg_amount = per_kg * total_kg;

-- INSERT INTO

INSERT INTO
    item_purchased(items, category, total_kg, per_kg, items_code)
VALUES
    ("rice", 'ponni', 100, 30, 'IT001');
