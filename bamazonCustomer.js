// require dependencies
var inquirer = require("inquirer");
var mysql = require("mysql");

// create connection to the database
var connection = mysql.createConnection({
    host:"localhost", 
    port: 3306,

    //Your username
    user: "root", 

    // Your Password
    password: "Cb11988!",
    database: "bamazon"
});

// function that displays items currently in inventory
function displayInventory(){
    //prints items for sale and their details

    connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;

        console.log("_.~._~._.~.~._.~Welcome to Bamazon~._.~._~._.~._~._");
        console.log("\n--------------------------------------------------------------------------------------------------\n");

        //loop through items and display table
        for(var i=0; i<res.length; i++){
            console.log("ID: " + res[i].item_id + "|" + "Product Name: " + res[i].product_name + "|" + "Department: " + res[i].department_name + "|" + "Price: " + res[i].price + "|" + "Quantity: " + res[i].stock_quantity);
            console.log("--------------------------------------------------------------------------------------------------")
        }

        promptUserPurchase();
    });

};

displayInventory();

// validate user input make sure user is supplying only positive integers 
function validateInput(value) {
    var interger = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if(integer && (sign === 1)) {
        return true;
    }else {
        return "Please enter a whole non-zero number.";
    }
}

