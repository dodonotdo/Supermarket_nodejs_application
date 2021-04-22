/*

1. to change date and amount automaticaly update

*/

DELIMITER $$
CREATE  PROCEDURE get_datas (
	itemsCode VARCHAR(255),
    items VARCHAR(255),
	category VARCHAR(255),
	item_kg INT
    
)
BEGIN
    DECLARE balance_kg INT;
    DECLARE per_item_amount INT;  

    SELECT amount into per_item_amount FROM price_details AS pd where pd.items_code=itemsCode AND pd.pricedate=(SELECT CURRENT_DATE()) ORDER BY id DESC LIMIT 1;

/*    IF (per_item_amount != '') THEN
        SELECT amount into per_item_amount FROM price_details AS pd where pd.items_code=itemsCode AND pd.pricedate=(SELECT CURRENT_DATE()) ORDER BY id DESC LIMIT 1;
    ELSE
        SELECT amount into per_item_amount FROM price_details AS pd where pd.items_code=itemsCode AND pd.pricedate=(SELECT CURRENT_DATE() - 1) ORDER BY id DESC LIMIT 1;
    END IF;
*/

    SELECT total_kg into balance_kg FROM item_purchase AS a WHERE a.items=items;
	
    UPDATE item_purchase AS c SET c.total_kg=(balance_kg - item_kg) WHERE c.items=items;
    
    INSERT INTO item_sales(items_code, items, category, item_kg, per_item_amt, total_item_amt, balance_kg ) VALUES 
        (itemsCode,items,category,item_kg,per_item_amount,(item_kg * per_item_amount),(balance_kg - item_kg));

END $$
DELIMITER ; 


/*
delete store procedure
*/

drop procedure get_datas;

/*
call the store procedure
*/

call get_datas('IT001','rice','ponni','2');