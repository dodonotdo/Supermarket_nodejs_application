/*

1. to change date and amount automaticaly update

*/

DELIMITER $$
CREATE  PROCEDURE datas(
	variety_code VARCHAR(25) ,
	items_code VARCHAR(25),
	items_name VARCHAR(255),
	varietyName VARCHAR(255),
	items_kg INT
)
BEGIN
	DECLARE balance_kg INT;
	DECLARE per_kg_amt INT;
    
	SELECT total_kg,per_kg_updated_amt into balance_kg,per_kg_amt FROM item_purchased AS a WHERE a.variety_code = variety_code;
	UPDATE item_purchased SET total_kg=(balance_kg - items_kg) WHERE variety_name=varietyName;

	INSERT INTO item_sales(items_code, variety_code, items_name, variety_name, items_kg, per_kg_amt, total_kg_amt, balance_kg) 
    VALUES (items_code, variety_code, items_name, varietyName, items_kg, per_kg_amt, (items_kg * per_kg_amt),(balance_kg - items_kg));
END$$
DELIMITER ;	

drop procedure data;
call datas('RC0R1', 'RC001', 'rice', 'rnr', 10);


/*
delete store procedure
*/

drop procedure get_datas;

/*
call the store procedure
*/

call get_datas('IT001','rice','ponni','2');