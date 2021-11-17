// Server.js
// Last Modified: 11/16/2021

/* ******************* Init packages ******************* */
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var mysql = require('mysql2');

/* ******************* Setup database connection ******************* */
// Creates connection to database using root
var con = mysql.createConnection({
  host: "localhost",
  // user: "testUser",
  // password: "testUser123#"
  user: "root",
  password: "977EB4CCA8559B0F7C9E920188A7084ED29248CDD12B979C58A19E7ADF57AF80"
});

// Print to console if connected to database
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

/* ******************* Send html/css/js files to client ******************* */

// Send off login.html page to client
app.get('/login.html', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// Send off landing.html page to client
app.get('/landing.html', (req, res) => {
    res.sendFile(__dirname + '/landing.html');
});

// Send off home.html page to client
app.get('/home.html', (req, res) => {
  res.sendFile(__dirname + '/home.html');
});

// Send off search.html page to client
app.get('/search.html', (req, res) => {
  res.sendFile(__dirname + '/search.html');
});

// Send off calendar.html page to client
app.get('/calendar.html', (req, res) => {
  res.sendFile(__dirname + '/calendar.html');
});

// Send off addTask.html page to client
app.get('/addTask.html', (req, res) => {
  res.sendFile(__dirname + '/addTask.html');
});

// Send off signup.html page to client
app.get('/signup.html', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

// Send off default.css stylesheet to client
app.get('/default.css', (req, res) => {
    res.sendFile(__dirname + '/default.css');
});
  
// Send off app.js script to client
app.get('/app.js', (req, res) => {
    res.sendFile(__dirname + '/app.js');
});

/* ******************* Form Controllers ******************* */

// Get data from login form and manipulate database   
// Just a test to demonstrate working connection to database 
app.post('/login', urlencodedParser, (req, res) => {
    // console.log('Got body:', req.body);
    // res.sendStatus(200);

    // Redirects to home page after form submission
    res.writeHead(302, {
        'Location': '/home.html'
    });
    res.end();

    // SQL queries
    con.query("USE pets");
    con.query("CREATE TABLE IF NOT EXISTS emp(id TEXT, name TEXT)");
    con.query("INSERT INTO emp(id,name) VALUES(?,?)", [req.body.email, req.body.password], function(err, result, field){
        if(err) throw err;
        // console.log(result);
        // console.log("Table results above");
    });
    con.query("SELECT * FROM emp", function(err, result, field){
        if(err) throw err;
        console.log("emp table below:");
        console.log(result);
    });
});

app.post('/calendar', urlencodedParser, (req, res) => {
    // console.log('Got body:', req.body);
    // res.sendStatus(200);

    // Redirects to home page after form submission
    res.writeHead(302, {
        'Location': '/calendar.html'
    });
    res.end();

    // SQL queries
    con.query("USE brainbank", function(err, result, fields){
        if(err) throw err;
        console.log("Set database to brainbank");
    });

    //Create calendar table
    con.query("CREATE TABLE IF NOT EXISTS calendar(taskId int PRIMARY KEY NOT NULL AUTO_INCREMENT, userId TEXT NOT NULL, startDate DATE NOT NULL, startTime TIME, endTime TIME, name TEXT NOT NULL, active BOOL NOT NULL, descr TEXT)", function(err, result, fields){
         if(err) throw err;
         console.log("Created calendar table in database");
    });

    con.query("INSERT INTO calendar(userId, startDate, name, active) VALUES(?,?,?,?)", [req.body.userId, req.body.startDate, req.body.name, true], function(err, result, field){
          if(err) throw err;
    });

    con.query("SELECT * FROM calendar", function(err, result, field){
         if(err) throw err;
         console.log("calendar table below:");
         console.log(result);
     });
});


/* ******************* Listener ******************* */

// Server on port 8082
app.listen(8082);