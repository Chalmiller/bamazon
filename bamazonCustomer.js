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
    runSearch();
});

function queryAllItems() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------");
    });
}

function queryIDs() {
    connection.query("SELECT * FROM products", function(err, res) {
        var itemslist;
        for (var i = 0; i < res.length; i++) {
            itemslist += res[i].item_id;
        }
        return itemslist;
    })
}

function updateProducts(newQuery) {
    connection.query(newQuery, function(err, result) {
        console.log(result)
    })
}

function runSearch() {
    queryAllItems();
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        inquirer
            .prompt([{
                name: "product_name",
                type: "rawlist",
                choices: function() {
                    var chosenItem = []
                    for (var i = 0; i < res.length; i++) {
                        chosenItem.push(res[i].product_name);
                    }
                    return chosenItem;
                },
                message: "What would you like to purchase?",
            }, {
                name: "itemQuantity",
                type: "input",
                message: "How many would you like to purchase?",
            }])
            .then(function(answer) {
                var Item;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].product_name === answer.product_name) {
                        Item = res[i];
                    }
                }
                console.log(Item.id)
                if (Item.stock_quantity < answer.itemQuantity) {
                    console.log("Insufficient Quantity!");
                    console.log("Try Again!");
                    runSearch();
                } else {
                    var itemPrice = (Item.price * answer.itemQuantity);
                    console.log("Your total comes to $" + itemPrice)
                    var newQuantity = Item.stock_quantity - parseInt(answer.itemQuantity);
                    connection.query("UPDATE products SET ? WHERE ?", [{
                        stock_quantity: newQuantity,
                    }, {
                        product_name: Item.product_name
                    }], function(err, result) {
                        if (err) throw err;
                        console.log(result.affectedRows + " record(s) updated");
                    })
                  runSearch();
                }
            });
    });
};