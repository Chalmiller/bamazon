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
  queryAllItems();
});

function queryAllItems() {
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price);
    }
    console.log("-----------------------------------");
    runSearch();
  });
}
function queryIDs() {
  connection.query("SELECT * FROM products", function(err, res) {
    var itemslist;
    for (var i=0; i < res.length; i++) {
      itemslist += res[i].item_id;
    }
    return itemslist;
  })
}

function runSearch() {
  inquirer
    .prompt([{
      name: "idChoice",
      type: "input",
      message: "What would you like to purchase?",
    },
    {
      name: "itemQuantity",
      type: "input",
      message: "How many would you like to purchase?",

    }])
    .then(function(answer) {
      var query = "SELECT * FROM products";
      connection.query(query, { item_id: answer.idChoice }, function(err, res) {
        if (answer.itemQuantity > res[i].stock_quantity)
          console.log("Insufficient Quantity!");
        } else {
          var newQuantity = res[i].stock_quantity - answer.itemQuantity;;
          var newQuery = "UPDATE products"
          newQuery += "SET itemQuantity = " + newQuantity;
          newQuery += "WHERE item_id = " + answer.idChoice;
          connection.query(newQuery, function(err, res) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
          });
        })
      }
    }
  });
}

