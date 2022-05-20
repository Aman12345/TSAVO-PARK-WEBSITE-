//ctrl + C to stop the server-side client express/node
const express = require("express");
const app = express();
//use the process.environment PORT# or 5000
const port = process.env.PORT || 5000;

//extra libraries
var createError = require("http-errors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyParser = require("body-parser");
var flash = require("express-flash");
var session = require("express-session");

var mysql = require("mysql");
const { response } = require("express");
const connection = mysql.createConnection({
    host: "us-cdbr-east-05.cleardb.net",
    user: "bcb3e6a1abf395",
    password: "fab8e7c7",
    database: "heroku_393a117a1d1c56b",
});

//set the view engine to ejs
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//connection to our database
/*connection.query('SELECT * FROM inquiry WHERE id="0"', (error, rows) => {
    if (error) throw error;
    if (!error) {
        console.log(rows);
    }
});*/

//in order to use css we need to create a .use
app.use(express.static("public"));

//use the res.render method in express to render the HTML as EJS
//index page or home page
app.get("/", (req, res) => {
    res.render("pages/index");
    console.log("WELCOME TO THE HOME PAGE");
});

//contact page
app.get("/contact", (req, res) => {
    res.render("pages/contact");
    console.log("WELCOME TO THE CONTACT PAGE");
});

app.post("/generalInquiry", (req, res, next) => {
    var f_name = req.body.firstname;
    var l_name = req.body.lastname;
    var email = req.body.email;
    var query = req.body.query;

    var sql = `INSERT INTO inquiry(fname,lname,email,query) VALUES("${f_name}","${l_name}","${email}","${query}")`;
    connection.query(sql, function(error, results) {
        if (error) throw error;
        console.log("record inserted shown on backend");
        res.redirect("/");
    });
});

//about page
app.get("/about", (req, res) => {
    res.render("pages/about");
    console.log("WELCOME TO THE ABOUT PAGE");
});

//safaris page
app.get("/safaris", (req, res) => {
    res.render("pages/safaris");
    console.log("WELCOME TO THE SAFARI PAGE");
});

//error page
app.get("*", (req, res) => {
    res.render("pages/error");
});

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

// error handler middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || "Internal Server Error",
        },
    });
});

app.listen(port, (err) => {
    if (err) {
        console.log(`error while starting the server on ${port}`);
    } else {
        console.log(`App listening on ${port}`);
    }
});