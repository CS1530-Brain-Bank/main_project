console.log("In sql.js script");

var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "testUser",
  password: "testUser123#"
  // user: "root",
  // password: "977EB4CCA8559B0F7C9E920188A7084ED29248CDD12B979C58A19E7ADF57AF80"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  con.query("USE pets");
  con.query("SELECT * FROM cats", function(err, result, field){
    if(err) throw err;
    console.log(result);
    console.log("Table results above");
  });
});

