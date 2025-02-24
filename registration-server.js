var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Orange2000!",
    database: "d2"
});

con.connect(function(err) {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        return;
    }
    console.log("Connected!");

    /*################# WORKING ON DATABASE D2 #################*/

    // Drop the database if it exists
    var dropDbSql = "DROP DATABASE IF EXISTS d2";
    con.query(dropDbSql, function(err, result) {
        if (err) {
            console.error('Error dropping database:', err.message);
            return;
        }
        console.log("Database 'd2' Dropped");

        // Create the database
        var createDbSql = "CREATE DATABASE d2";
        con.query(createDbSql, function(err, result) {
            if (err) {
                console.error('Error creating database:', err.message);
                return;
            }
            console.log("Database 'd2' Created");

            // Select the database
            con.query("USE d2", function(err, result) {
                if (err) {
                    console.error('Error selecting database:', err.message);
                    return;
                }
                console.log("Database 'd2' Selected");

                /*################# CREATING TABLE USERS #################*/

                // Create the table if it does not exist
                var createTableSql = "CREATE TABLE IF NOT EXISTS users (full_name VARCHAR(100), mobile_number VARCHAR(50), address VARCHAR(100), email VARCHAR(100), password VARCHAR(50))";
                con.query(createTableSql, function(err, result) {
                    if (err) {
                        console.error('Error creating table:', err.message);
                        return;
                    }
                    console.log("User Table Created");
                });

                /*################# CREATING TABLE CART #################*/ 
                
                var createCartTableSql = "CREATE TABLE IF NOT EXISTS cart (game_name VARCHAR(100), price DECIMAL(10, 2))";
                con.query(createCartTableSql, function(err, result) {
                    if (err) {
                        console.error('Error creating cart table:', err.message);
                        return;
                    }
                    console.log("Cart table Created");
                });

                /*################# CREATING TABLE MYORDERS #################*/ 
                
                var createCartTableSql = "CREATE TABLE IF NOT EXISTS myOrders (game_name VARCHAR(100), price DECIMAL(10, 2))";
                con.query(createCartTableSql, function(err, result) {
                    if (err) {
                        console.error('Error creating cart table:', err.message);
                        return;
                    }
                    console.log("My-Orders table Created");
                });
            });
        });
    });
});

app.use(express.static(__dirname));
app.post('/register', function(req, res) {
    var fullName = req.body.fullName;
    var mobileNumber = req.body.mobNumber;
    var address = req.body.address;
    var email = req.body.email;
    var password = req.body.password;

    var insertUserSql = "INSERT INTO users (full_name, mobile_number, address, email, password) VALUES (?, ?, ?, ?, ?)";
    con.query(insertUserSql, [fullName, mobileNumber, address, email, password], function(err, result) {
        if (err) {
            console.error('Error inserting user:', err.message);
            return;
        }
        console.log("User inserted");
        res.redirect('/login.html');
    });
});

app.post('/login', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  var selectUserSql = "SELECT * FROM users WHERE email = ? AND password = ?";
  con.query(selectUserSql, [email, password], function(err, result) {
      if (err) {
          console.error('Error selecting user:', err.message);
          return;
      }

      if (result.length > 0) {
          res.redirect('/HomePage/index.html'); 
      } else {
          var errorMessage = "Invalid email or password";
          var jsCode = "<script>"+
                       "alert('" + errorMessage + "');"+
                       "window.location.href = '/login.html';"+
                       "</script>";
          res.send(jsCode); 
      }
  });
});

app.post('/addToCart', function(req, res) {
  var gameName = req.body.gameName;
  var price = req.body.price;

  var insertCartItemSql = "INSERT INTO cart (game_name, price) VALUES (?, ?)";
  con.query(insertCartItemSql, [gameName, price], function(err, result) {
      if (err) {
          console.error('Error inserting cart item:', err.message);
          return;
      }
      console.log("Cart item inserted");
      res.send({ success: true });
  });
});

/*########################## MyOrders TESTING ##########################*/
app.post('/addToMyOrders', function(req, res) {
  var gameName = req.body.gameName;
  var price = req.body.price;

  var insertCartItemSql = "INSERT INTO myOrders (game_name, price) VALUES (?, ?)";
  con.query(insertCartItemSql, [gameName, price], function(err, result) {
      if (err) {
          console.error('Error inserting cart item:', err.message);
          return;
      }
      console.log("Item added to orders");
      res.send({ success: true });
  });
});
/*########################## MyOrders TESTING ##########################*/

app.get('/getCartItems', function(req, res) {
  var selectCartItemsSql = "SELECT game_name, price FROM cart";
  con.query(selectCartItemsSql, function(err, result) {
    if (err) {
      console.error('Error retrieving cart items:', err.message);
      return;
    }
    res.send(result);
  });
});

/*########################## MyOrders TESTING ##########################*/
app.get('/getMyOrderItems', function(req, res) {
  var selectOrderItemsSql = "SELECT game_name, price FROM myOrders";
  con.query(selectOrderItemsSql, function(err, result) {
    if (err) {
      console.error('Error retrieving order items:', err.message);
      return;
    }
    res.send(result);
  });
});
/*########################## MyOrders TESTING ##########################*/

app.post('/removeFromCart', function(req, res) {
  var gameName = req.body.game_name;
  var price = req.body.price;

  var deleteCartItemSql = "DELETE FROM cart WHERE game_name = ? AND price = ?";
  con.query(deleteCartItemSql, [gameName, price], function(err, result) {
    if (err) {
      console.error('Error deleting cart item:', err.message);
      return;
    }
    console.log("Cart item deleted");
    res.send({ success: true });
  });
});

app.post('/removeAllFromCart', function(req, res) {
  var deleteAllCartItemsSql = "DELETE FROM cart";
  con.query(deleteAllCartItemsSql, function(err, result) {
    if (err) {
      console.error('Error deleting all cart items:', err.message);
      return;
    }
    console.log("All cart items deleted");
    res.send({ success: true });
  });
});


app.listen(3000, function() {
    console.log("Server listening on port 3000");
});