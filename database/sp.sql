
-- 1. to change date and amount automaticaly update

DELIMITER $$
CREATE  PROCEDURE datas(
	variety_code VARCHAR(25) ,
	items_code VARCHAR(25),
	items_name VARCHAR(255),
	varietyName VARCHAR(255),
	items_kg INT
)
BEGIN
	DECLARE remaining_kg INT;
	DECLARE per_kg_amt INT;
    
	SELECT total_kg,per_kg_updated_amt into remaining_kg,per_kg_amt FROM item_purchased AS a WHERE a.variety_code = variety_code;
	UPDATE item_purchased SET total_kg=(remaining_kg - items_kg) WHERE variety_name=varietyName;

	INSERT INTO item_sales(items_code, variety_code, items_name, variety_name, items_kg, per_kg_amt, total_kg_amt, balance_kg) 
    VALUES (items_code, variety_code, items_name, varietyName, items_kg, per_kg_amt, (items_kg * per_kg_amt),(remaining_kg - items_kg));
END$$
DELIMITER ;	

-- call the store procedure

call datas('RC0R1', 'RC001', 'rice', 'rnr', 10);


-- delete store procedure

drop procedure datas;
