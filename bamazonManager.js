// Get required dependencies
var inquirer = require("inquirer");
var mysql = require ("mysql");

// Connect mysql

var connection = mysql.createConnection({
    host: "localhost", 
    port: 3306, 

    // Your username: 
    user: "root", 

    // Your password
    password: "Cb11988!", 
    database: "bamazon"
});
