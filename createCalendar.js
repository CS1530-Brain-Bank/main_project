// createCalendarTable.js
// Last Modified: 11/16/2021

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

//Create calendar table
con.query("CREATE TABLE IF NOT EXISTS calendar(taskId int PRIMARY KEY NOT NULL AUTO_INCREMENT, userId TEXT NOT NULL, startDate DATE NOT NULL, startTime TIME, endTime TIME, name TEXT NOT NULL, active BOOL NOT NULL, descr TEXT)", function(err, result, fields){
     if(err) throw err;
     console.log("Created calendar table in database");
 });
//  CREATE TABLE

 //Use queries to init table properties for service
//  con.query("INSERT INTO calendar(userId, startDate, name, active) VALUES(?,?,?,?)", [req.body.userId, req.body.startDate, req.body.name, true], function(err, result, field){
//          if(err) throw err;
//      });

 con.query("SELECT * FROM calendar", function(err, result, field){
     if(err) throw err;
     console.log("calendar table below:");
     console.log(result);
 });