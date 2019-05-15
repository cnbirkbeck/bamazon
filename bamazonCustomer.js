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
    password: "",
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


// validate user input make sure user is supplying only positive integers 
function validateInput(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if(integer && (sign === 1)) {
        return true;
    }else {
        return "Please enter a whole non-zero number.";
    }
}

//prompt user to enter item information to make a purchase
function promptUserPurchase() {
    
    // prompt user to select an item
    inquirer.prompt([
        {
            type: "input", 
            name: "item_id", 
            message: "Please enter the Item ID for the item you would like to purchase.",
            validate: validateInput,
            filter: Number
        },
        {
            type: "input", 
            name: "quantity", 
            message: "How many units of that item would you like to purchase?",
            validate: validateInput, 
            filter: Number
        }
        
    ]).then(function(input){

        console.log("You've selected: \n Item ID : " +input.item_id + "\n with a quantity of : " + input.quantity );

        var item = input.item_id;
        var quantity = input.quantity;

        //Query db to confirm that the given item ID exists / available in desired quantity

        var queryStr = "SELECT * FROM products WHERE ?";

        connection.query(queryStr, {item_id: item}, function(err, data){
            if (err) throw err;

            // if the user selected an invalid item, the data array should be empty
            // console.log("data = " + JSON.stringify(data));

            if (data.length === 0) {
                console.log("ERROR: Invalid Item ID entered. Please select a valid Item ID.");
                displayInventory();
            } else {
                var productData = data[0];

                // console.log('productData = ' + JSON.stringify(productData));
                // console.log('productData.stock_quantity = ' + productData.stock_quantity);
                
                // if the quantity requested by the user is in stock
                if (quantity <= productData.stock_quantity) {
                    console.log("The product you selected is in stock! We will proceed with placing your order!");

                    // updating the query string
                    var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
                    
                    //updating the inventory
                    connection.query(updateQueryStr, function(err, data) {
						if (err) throw err;

						console.log('Your order has been placed! Your total is $' + productData.price * quantity);
						console.log('Thank you for shopping with us!');
						console.log("\n---------------------------------------------------------------------\n");

						// End the database connection
						connection.end();
					})
                } else {
                       console.log("Sorry, we don't have enough product in stock to fulfill your order.");
                       console.log("Please modify your oder, and try again.");
                       console.log("\n-------------------------------------------------------------------------------------\n");

                       displayInventory();
                    }
                }
            })
        });
    }



function startBamazon() {
    displayInventory();
}

startBamazon();


