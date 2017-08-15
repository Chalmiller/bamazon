DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
id int NOT NULL AUTO_INCREMENT,
product_name VARCHAR(255) NOT NULL,
department_name VARCHAR(255) NOT NULL,
price INTEGER(100),
stock_quantity INT(20),
PRIMARY KEY(id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Blankets", "Amazon", 10, 20);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Pillows", "Amazon", 20, 20);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Sheets", "Amazon", 10, 20);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Towels", "Amazon", 5, 20);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Hand Towels", "Amazon", 5, 20);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Throw Pillows", "Amazon", 15, 20);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Paper Towels", "Amazon", 20, 20);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Soap", "Amazon", 5, 20);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Shampoo", "Amazon", 5, 20);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("Body Wash", "Amazon", 5, 20);