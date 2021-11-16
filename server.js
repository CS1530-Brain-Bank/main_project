const express = require('express');
var bodyParser = require('body-parser');
const app = express();
var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  // user: "testUser",
  // password: "testUser123#"
  user: "root",
  password: "977EB4CCA8559B0F7C9E920188A7084ED29248CDD12B979C58A19E7ADF57AF80"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
  
var urlencodedParser = bodyParser.urlencoded({ extended: false })
    
app.get('/login.html', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.get('/landing.html', (req, res) => {
    res.sendFile(__dirname + '/landing.html');
});
  
app.get('/default.css', (req, res) => {
    res.sendFile(__dirname + '/default.css');
});
  

app.get('/app.js', (req, res) => {
    res.sendFile(__dirname + '/app.js');
});
    
app.post('/add', urlencodedParser, (req, res) => {
    console.log('Got body:', req.body);
    res.sendStatus(200);

    con.query("USE pets");
    con.query("CREATE TABLE IF NOT EXISTS emp(id TEXT, name TEXT)");
    con.query("INSERT INTO emp(id,name) VALUES(?,?)", [req.body.email, req.body.password], function(err, result, field){
        if(err) throw err;
        console.log(result);
        console.log("Table results above");
  });

});
    
app.listen(8082);