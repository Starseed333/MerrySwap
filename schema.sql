CREATE DATABASE products_db;

USE products_db;


CREATE TABLE products(
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	description VARCHAR(50) NOT NULL,
	category_name	VARCHAR(50) NOT NULL,
	image_url VARCHAR (100) NOT NULL,
	PRIMARY KEY (item_id)
);

Select * FROM products;