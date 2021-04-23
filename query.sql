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



-- update
UPDATE
    item_purchase
SET
    total_kg_amount = per_kg * total_kg;

-- insert into
INSERT INTO
    item_purchase(items, category, total_kg, per_kg, items_code)
VALUES
    ("rice", 'ponni', 100, 30, 'IT001');



-- to update balance_kg column and total_kg columns
DELIMITER $$
CREATE PROCEDURE get_data (
	items_code VARCHAR(255),
    items VARCHAR(255),
	category VARCHAR(255),
	item_kg INT,
	per_item_amt INT
)
BEGIN
    DECLARE balance_kg INT;
    SELECT total_kg into balance_kg FROM item_purchase AS a WHERE a.items=items;
	UPDATE item_purchase AS c SET c.total_kg=(balance_kg - item_kg) WHERE c.items=items;
    INSERT INTO item_sales(items_code, items, category, item_kg, per_item_amt, total_item_amt, balance_kg ) VALUES 
        (items_code,items,category,item_kg,per_item_amt,(item_kg * per_item_amt),(balance_kg - item_kg));

END $$
DELIMITER ; 

call get_data('IT001','rice','ponni','100','30' );




SELECT items_code, ((SELECT total_kg FROM item_purchase WHERE items="rice" order by purchase_id desc limit 1) - 12) as balancer
FROM  item_sales;

{
	"items_code":"RC001",
	"variety_code":"RC0S1",
	"items_name":"rice",
	"variety_name":"samba",
	"items_kg":"5",
	"per_kg_amt":"60"
}