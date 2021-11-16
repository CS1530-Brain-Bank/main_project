var mysql = require('mysql2');

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

// Create brainbank database if it doesn't exist (Should exist, but can keep in code)
con.query("CREATE DATABASE IF NOT EXISTS brainbank", function(err, result, fields){
    if(err) throw err;
    console.log("Created brainbank database");
});

// Sets active database to brainbank database
con.query("USE brainbank", function(err, result, fields){
    if(err) throw err;
    console.log("Set database to brainbank");
});

/* ********************** KEEP ABOVE - INSERT YOUR TABLE CREATION BELOW ************************* */

