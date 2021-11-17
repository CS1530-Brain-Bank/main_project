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

// Send off contacts.html page to client
app.get('/contacts.html', (req, res) => {
  res.sendFile(__dirname + '/contacts.html');
});

// Send off pictures.html page to client
app.get('/pictures.html', (req, res) => {
  res.sendFile(__dirname + '/pictures.html');
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

// Send off index.ejs script to client
app.get('/index.ejs', (req, res) => {
  res.sendFile(__dirname + '/index.ejs');
});

// Send off imageView.ejs script to client
app.get('/imageView.ejs', (req, res) => {
  res.sendFile(__dirname + '/imageView.ejs');
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

// Picture controller
app.get("/image/:id", (req, res) => {
  const { id }=req.params;
  const query = "Select file_data From file Where id = ?";
  con.query(query, [id], (err, result) => {
    if (err) {
      console.log(err);
    }
    // console.log(Buffer.from(result[0].file_data).toString())
    res.render("imageView", { name: result[0].file_data });
  })
});

// Picture controller
app.post("/store", (req, res) => {
  const { image, fileName } = req.body;
  const query = "Insert Into file(null, file_name, file_data, created_by, created_on) Values(?,?,?,CURRENT_TIMESTAMP)";
  con.query(query, [fileName, image, 'Program'], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send({ msg:'SERVER_ERROR' });
    }
    res.status(200).send({ id:result.insertId });
  })
});

/* ******************* Listener ******************* */

// Server on port 8082
app.listen(8082);