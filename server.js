const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const appDir = path.resolve(__dirname, "public");
const mysql = require('mysql');
const session = require('express-session');

app.use(express.static(appDir));
app.use(bodyParser.json());

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.get("/", function (req, res) {
    res.sendFile(path.resolve(appDir, "GourmetHub.html"));
});
app.get("/searchRestaurant",searchRestaurant);

app.post("/steakHouse", listSteakhouse);
app.post("/burgerJoints", listBurgerJoint);
app.post("/indianResto", listIndianResto);
app.post("/mexicanResto", listMexicanResto);
app.post("/chineseResto", listChineseResto);
app.post("/sortZtoA", sortRestoDesc);
app.post("/sortAtoZ", sortRestoAsc);
app.post("/displayRestaurants", displayRestaurant);
app.post("/users", postUsersignup);
app.post("/owners", postOwnersignup);
app.post("/userLogin", userLogin);
app.post("/ownerLogin", restoOwnerLogin);

//Connect to localhost
app.listen(3015, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connection to port 3015 is successful!");
    }
});

//Create connection to database
let connectionPool = mysql.createPool({
    connectionLimit: 1,
    host: "localhost",
    user: "rohini",
    password: "rohini",
    database: "restaurantfinder",
    debug: false
});

//List restaurants
function displayRestaurant(req, res) {
    let sql = "SELECT restaurantId, restaurantName, cuisineType, location FROM restaurant";

    connectionPool.query(sql, (err, result) => {
        if (err) {
            console.error("Error executing query: " + JSON.stringify(err));
        } else {
            res.send(JSON.stringify(result));
        }
    });
}

//Sort restaurants in ascending order
function sortRestoAsc(req, res) {
    let sql = "SELECT restaurantId, restaurantName, cuisineType, location FROM restaurant ORDER BY restaurantName ASC";

    connectionPool.query(sql, (err, result) => {
        if (err) {
            console.error("Error executing query: " + JSON.stringify(err));
        } else {
            res.send(JSON.stringify(result));
        }
    });
}

//Sort restaurants in descending order
function sortRestoDesc(req, res) {
    let sql = "SELECT restaurantId, restaurantName, cuisineType, location FROM restaurant ORDER BY restaurantName DESC";

    connectionPool.query(sql, (err, result) => {
        if (err) {
            console.error("Error executing query: " + JSON.stringify(err));
        } else {
            res.send(JSON.stringify(result));
        }
    });
}

//List chinese restaurants
function listChineseResto(req, res) {
    let sql = "SELECT restaurantName, location FROM restaurant WHERE cuisineType='Chinese'";

    connectionPool.query(sql, (err, result) => {
        if (err) {
            console.error("Error executing query: " + JSON.stringify(err));
        } else {
            res.send(JSON.stringify(result));
        }
    });
}

//List mexican restaurants
function listMexicanResto(req, res) {
    let sql = "SELECT restaurantName, location FROM restaurant WHERE cuisineType='Mexican'";

    connectionPool.query(sql, (err, result) => {
        if (err) {
            console.error("Error executing query: " + JSON.stringify(err));
        } else {
            res.send(JSON.stringify(result));
        }
    });
}

//List indian restaurants
function listIndianResto(req, res) {
    let sql = "SELECT restaurantName, location FROM restaurant WHERE cuisineType='Indian'";

    connectionPool.query(sql, (err, result) => {
        if (err) {
            console.error("Error executing query: " + JSON.stringify(err));
        } else {
            res.send(JSON.stringify(result));
        }
    });
}

//List burger joints
function listBurgerJoint(req, res) {
    let sql = "SELECT restaurantName, location FROM restaurant WHERE cuisineType='Burger'";

    connectionPool.query(sql, (err, result) => {
        if (err) {
            console.error("Error executing query: " + JSON.stringify(err));
        } else {
            res.send(JSON.stringify(result));
        }
    });
}

//List steak hubs
function listSteakhouse(req, res) {
    let sql = "SELECT restaurantName, location FROM restaurant WHERE cuisineType='Steak'";

    connectionPool.query(sql, (err, result) => {
        if (err) {
            console.error("Error executing query: " + JSON.stringify(err));
        } else {
            res.send(JSON.stringify(result));
        }
    });
}


//Register user
//Insert user details
async function insertUser(firstName, lastName, username, email, password, locationuser) {
    //Build query
    let sql = "INSERT INTO users (firstName, lastName, username, emailAdd, password, location) VALUES ('" + firstName + "', '" + lastName + "', '" + username + "', '" + email + "', '" + password + "', '" + locationuser + "');";
    return new Promise((resolve, reject) => {
        connectionPool.query(sql, (err, result) => {
            if (err) {
                reject("Error executing query: " + JSON.stringify(err));
            } else {
                resolve(result);
            }
        });
    })
}

//Handle post request of user registration
function postUsersignup(request, response) {
    let newFirstName = request.body.firstName;
    let newLastName = request.body.lastName;
    let newUsername = request.body.username;
    let newEmail = request.body.email;
    let newPassword = request.body.password;
    let newLocation = request.body.address;

    insertUser(newFirstName, newLastName, newUsername, newEmail, newPassword, newLocation).then(result => {
        response.send ("User account successfully created");
    }).catch(err => {
        console.error(JSON.stringify(err));
    });
}

//Register restaurant owner
//Insert restaurant owner details
async function insertRestaurantOwner(firstName, lastName, email, password, contactNumber) {
    //Build query
    let sql = "INSERT INTO restaurantowner (firstName, lastName, email, password, phoneNumber) VALUES ('" + firstName + "', '" + lastName + "', '" + email + "', '" + password + "', '" + contactNumber + "');";
    return new Promise((resolve, reject) => {
        connectionPool.query(sql, (err, result) => {
            if (err) {
                reject("Error executing query: " + JSON.stringify(err));
            } else {
                resolve(result);
            }
        });
    })
}

//Handle post request of restaurant owner registration
function postOwnersignup(req, response) {
    let newOwnerFirstName = req.body.ownerFirstName;
    let newOwnerLastName = req.body.ownerLastName;
    let newOwnerEmail = req.body.ownerEmailAdd;
    let newOwnerPassword = req.body.ownerPass;
    let newOwnerNumber = req.body.ownerPhoneNumber;

    insertRestaurantOwner(newOwnerFirstName, newOwnerLastName, newOwnerEmail, newOwnerPassword, newOwnerNumber).then(result => {
        response.send ("Restaurant owner account successfully created");
    }).catch(err => {
        console.error(JSON.stringify(err));
    });git
}


function userLogin (request, response) {
    let username = request.body.user_name;
    let password = request.body.user_password;
    let sql = "SELECT username, password FROM users WHERE username = '" + username + "' AND password = '" + password + "'";

    if (username && password) {
        connectionPool.query(sql , [username, password], function(error, results) {
            if (results.length > 0) {
                //verify user
                request.session.username = username;
                request.session.loggedin = true;
                response.send("User logged in")
            } else {
                response.send('Incorrect Username and/or Password!');
            }
        });
    } else {
        response.send('Could not login.');
    }
}

//User Login
function restoOwnerLogin (request, response) {
    let email = request.body.owner_email;
    let password = request.body.owner_password;
    let sql = "SELECT email, password FROM restaurantowner WHERE email = '" + email + "' AND password = '" + password + "'";

    if (email && password) {
        connectionPool.query(sql, [email, password], function(error, results) {
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.owner_email = email;
                response.send("You are logged in")
            } else {
                response.send('Incorrect email and/or Password!');
            }
            response.end();
        });
    } else {
        response.send('Could not login.');
        response.end();
    }
}

//Search restaurant
function searchRestaurant (req, res){
    let searchInput = req.body.search_Input;
    let sql = "SELECT restaurantName, cuisineType, location FROM restaurant WHERE location = '" + searchInput + "'";

    connectionPool.query(sql, (err, result) => {
        if (err) {
            console.error("Error executing query: " + JSON.stringify(err));
        } else {
            res.send(JSON.stringify(result));
        }
    });
}



