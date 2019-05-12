-- drop database if exists --
DROP DATABASE IF EXISTS bamazon;

-- Create database called bamazon--
CREATE DATABASE bamazon; 

-- go into bamazon database--
USE bamazon;

-- Create table, "products". Contains all store inventory. --
CREATE TABLE products (
    item_id INTEGER (11) AUTO_INCREMENT NOT NULL, 
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL, 
    price DECIMAL (10,2) NOT NULL, 
    stock_quantity INTEGER (11) NOT NULL,
    PRIMARY KEY (item_id) 

);

-- inputting data into products table--
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("DJI Mavic 2 PRO Drone Quadcopter", "Electronics", 1500.00, 104),
("Nikon AF-S NIKKOR 14-24mm f/2.8G ED", "Electronics", 1685.99, 50),
("Nikon AF-S NIKKOR 70-200mm f/2.8E FL ED VR Lens", "Electronics", 2500.00, 32),
("Exploding Kittens: NSFW", "Games", 34.67, 54), 
("Unstable Unicorns", "Games", 25.44, 78),
("Brooks Launch 5", "Shoes", 75.69, 24),
("Adidas NMD_R1", "Shoes", 130.00, 42),
("Helly Hansen W Lifaloft Hybrid Insulator Jacket", "Clothing", 89.95, 224),
("Garmin Instinct", "Watches \ Jewlery", 285.34, 15),
("GoPro Hero 7 Black", "Electronics", 450.00, 13);
