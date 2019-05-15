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

//displayInventory retrieves current products for sale and outputs them to the console
function displayInventory() {
    // construct db query string
    queryStr = "SELECT * FROM products";

    // made db query
    connection.query(queryStr, function(err, data){
        if(err) throw err;
        console.log("Existing Inventory: ");
        console.log("...................\n");

        var strOut = ""; 
        for (var i = 0; i <data.length; i++) {
            strOut = "";
            strOut += "Item ID: " + data[i].item_id + " // ";
            strOut += "Product Name: " + data[i].product_name + " // ";
            strOut += "Department: " + data[i].department_name + " // ";
            strOut += "Price: $" + data[i].price + " // ";
            strOut += "Quantity: " + data[i].stock_quantity + "\n";

            console.log(strOut);
        }

        console.log("------------------------------------------------------------------------------------\n");

        //end database connection
        connection.end();
    })
}

// validateInteger ensures the user is supplying only positive integers for their inputs
function validateInteger(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return "Please enter a whole non-zero number.";
    }
}

// validateNumeric ensures the user is supplying only positive numbers for their inputs
function validateNumeric(value) {
    // Value must be a positive number
    var number = (typeof parseFloat(value)) === "number";
    var positive = parseFloat(value) > 0;

    if (number && positive) {
        return true;
    } else {
        return "Please enter a positive number for the unit's price."
    }
 
}

