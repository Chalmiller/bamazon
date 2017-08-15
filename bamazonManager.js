var mysql = require("mysql");
var inquirer = require("inquirer")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    managerView();
});

function managerView() {
    inquirer.prompt([{
        name: "productList",
        type: "list",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
        message: "What action would you like to take?"
    }]).then(function(answer) {
        console.log(answer.productList)
        switch (answer.productList) {
            case "View Products for Sale":
                viewProducts();
                break;
            case "View Low Inventory":
                viewLowInventory()
                break;
            case "Add to Inventory":
                addToInventory()
                break;
            case "Add New Product":
                addNewProduct()
                break;
        }
    })
}

function viewProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------");
        managerView();
    });
}

function viewLowInventory() {
    connection.query("SELECT * FROM products", function(err, res) {
        var lowInventory = []
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity <= 4) {
                lowInventory.push(res[i].product_name)
            }
        }
        console.log(lowInventory);
        console.log("The Following Items are deemed to have a low stock_quantity: ");
        console.log("-----------------------------------");
        for (var j = 0; j < lowInventory.length; j++) {
            console.log(lowInventory[j])
        }
        inquirer.prompt({
            name: "addChoice",
            type: "confirm",
            message: "Would you like to add to the inventory for any of these items?"
        }).then(function(ans) {
            switch (ans.addChoice) {
                case true:
                    addToInventory();
                case false:
                    managerView();
            }
        })
    })
};

function addToInventory() {
    connection.query("SELECT * FROM products", function(err, res) {
        var lowInventory = []
        if (err) throw err;
        inquirer.prompt([{
            name: "addInventory",
            type: "list",
            choices: function() {
                var chosenItem = []
                for (var i = 0; i < res.length; i++) {
                    chosenItem.push(res[i].product_name);
                }
                return chosenItem;
            },
            message: "Which item would you like to add inventory to?"
        }, {
            name: "quantityToAdd",
            type: "input",
            message: "How much would you like to add?"
        }]).then(function(ans) {
            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: ans.quantityToAdd,
            }, {
                product_name: ans.addInventory
            }], function(err, result) {
                if (err) throw err;
                console.log(result.affectedRows + " record(s) updated");
            })
        })
    })
};

function addNewProduct() {
	inquirer.prompt([{
		name: "product_name",
        type: "input",
        message: "What item would you like to add to our inventory?"
	}, {
		name: "department_name",
        type: "input",
        message: "What is the department name?"
	}, {
		name: "price",
        type: "input",
        message: "What is the price?"
    }, {
		name: "stock_quantity",
        type: "input",
        message: "What is the stock you'd like to add?"
    }]).then(function(answer) {
    	var newQuery = "INSERT products (product_name, department_name, price, stock_quantity) VALUES ("

    	newQuery += '"' + answer.product_name + '"' + ", "
    	newQuery += '"' + answer.department_name + '"' + ", "
    	newQuery += answer.price + ", "
    	newQuery += answer.stock_quantity + ");"
    	console.log(newQuery);
		connection.query(newQuery, function(err, result) {
                if (err) throw err;
                console.log(result.affectedRows + " record(s) updated");
            })
		viewProducts();
	})
}