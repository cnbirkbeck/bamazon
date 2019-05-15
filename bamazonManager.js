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

// promptManagerAction will present menu options to the manager allowing them to choose
function promptManagerAction(){

    //prompt manager to select an option
    inquirer.prompt([
        {
            type: "list", 
            name: "option", 
            message: "Please select a task option to continue: ",
            choices: [
                "View Products for Sale", 
                "View Low Inventory", 
                "Add to Inventory", 
                "Add New Product", 
                "Exit"
            ],
            
        }
    ]).then(function(input){
        switch(input.option){
        case "View Products for Sale":
            displayInventory();
            break;

        case "View Low Inventory":
            displayLowInventory();
            break;
            
        case "Add to Inventory":
            addInventory();
            break;
            
        case "Add New Product":
            createNewProduct();
            break;
        case "exit":
            connection.end();
            break;    
        }   
    });
}