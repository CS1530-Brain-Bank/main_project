// Server.js
// Last Modified: 11/16/2021

/* ******************* Init packages ******************* */
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var mysql = require('mysql2');

app.set("view engine", "ejs");
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extentded:true}));

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

// Send off addContact.html page to client
app.get('/addContact.html', (req, res) => {
  res.sendFile(__dirname + '/addContact.html');
});

// Send off pictures.html page to client
app.get('/pictures.html', (req, res) => {
  res.sendFile(__dirname + '/pictures.html');
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

// Send off calendar-styles.css stylesheet to client
app.get('/calendar-styles.css', (req, res) => {
  res.sendFile(__dirname + '/calendar-styles.css');
});
  
// Send off app.js script to client
app.get('/app.js', (req, res) => {
    res.sendFile(__dirname + '/app.js');
});

// Send off calendar.js script to client
app.get('/calendar.js', (req, res) => {
  res.sendFile(__dirname + '/calendar.js');
});

// Send off photoUpload.ejs script to client
app.get('/photoUpload.ejs', (req, res) => {
  res.render(__dirname + '/photoUpload.ejs');
});

// Send off imageView.ejs script to client
app.get('/imageView.ejs', (req, res) => {
  res.render(__dirname + '/imageView.ejs');
});

// Send off calender.png to client
app.get('/calender.png', (req, res) => {
  res.sendFile(__dirname + '/calender.png');
});

// Send off contacts.png to client
app.get('/contacts.png', (req, res) => {
  res.sendFile(__dirname + '/contacts.png');
});

// Send off pictures.png to client
app.get('/pictures.png', (req, res) => {
  res.sendFile(__dirname + '/pictures.png');
});

// Send off search.png to client
app.get('/search.png', (req, res) => {
  res.sendFile(__dirname + '/search.png');
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
    con.query("USE brainbank");
    con.query("CREATE TABLE IF NOT EXISTS users(userId int PRIMARY KEY NOT NULL AUTO_INCREMENT, email TEXT NOT NULL, password TEXT NOT NULL)", function(err, result, field){
        if(err) throw err;
    });
    con.query("INSERT INTO users(email,password) VALUES(?,?)", [req.body.email, req.body.password], function(err, result, field){
        if(err) throw err;
        // console.log(result);
        // console.log("Table results above");
    });
    con.query("SELECT * FROM users", function(err, result, field){
        if(err) throw err;
        console.log(result);
    });
});

// Send off number of pictures from DB to client
app.get('/numImgs', (req, res) => {
  con.query("USE brainbank", function(err, result, fields){
      if(err) throw err;
      // console.log("Set database to brainbank");
  });
  const query = "SELECT file_data FROM photos WHERE userID = ?";
  // Change the [userID1] to whatever is tracking userID across site
  con.query(query, ['userID1'], (err, result) => {
      if (err) {
          console.log(err);
      }
      var data = result.length;
      res.json({
        picCount: data
      });
      // console.log(data);
  });
});

// Send off pictures from DB to client
app.get('/displayImgs', (req, res) => {
    // console.log("Trying to display images in DB");
    con.query("USE brainbank", function(err, result, fields){
        if(err) throw err;
        // console.log("Set database to brainbank");
    });
    const query = "SELECT file_data FROM photos WHERE userID = ?";
    // Change the [userID1] to whatever is tracking userID across site
    con.query(query, ['userID1'], (err, result) => {
        if (err) {
            console.log(err);
        }
        // console.log("Parameters");
        // console.log(req.query.index);
        var blob = result[req.query.index];
        var data = blob.file_data;
        res.send(data);
        // console.log(data);
        // console.log("Sent image from database");
    });
});

app.get('/displayTasks', (req, res) => {
  con.query("USE brainbank", function(err, result, fields){
    if(err) throw err;
  });
  con.query("SELECT name, startDate, startTime, endTime FROM calendar WHERE userid='userId1'", function(err, result, field){
    if(err) throw err;
    let data = result;
    res.json({
      uData: data
    });
  });
});

// Image Upload controller
app.post("/store", (req, res) => {
  const { userID, image, fileName, tagText } = req.body;
  con.query("USE brainbank", function(err, result, fields){
    if(err) throw err;
    // console.log("Set database to brainbank");
  });
  const query = "INSERT INTO photos(userID, file_name, file_data, created_by, created_on, tags) VALUES(?,?,?,?,CURRENT_TIMESTAMP,?)";
  con.query(query, ['userID1', fileName, image, 'Program', tagText], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send({ msg:'SERVER_ERROR' });
    }
    // res.status(200).send({ id:result.insertId });
  })
});

// Send off number of pictures from DB to client
app.get('/numImgsSearch', (req, res) => {
  const tagText = req.query.tagText;
  // console.log("search tag text: "+tagText);
  con.query("USE brainbank", function(err, result, fields){
      if(err) throw err;
      // console.log("Set database to brainbank");
  });
  const query = "SELECT file_data FROM photos WHERE userID = ? AND MATCH(tags) AGAINST(?)";
  // Change the [userID1] to whatever is tracking userID across site
  con.query(query, ['userID1', tagText], (err, result) => {
      if (err) {
          console.log(err);
      }
      var data = result.length;
      res.json({
        picCount: data
      });
      // console.log(data);
  });
});

// Image Search controller
app.get("/searchImgs", (req, res) => {
  const tagText = req.query.tagText;
  // console.log("search tag text: "+tagText);
  con.query("USE brainbank", function(err, result, fields){
    if(err) throw err;
    // console.log("Set database to brainbank");
  });
  const query = "SELECT file_data FROM photos WHERE userID = ? AND MATCH(tags) AGAINST(?)";
  con.query(query, ['userID1', tagText], (err, result) => {
    if (err) {
      console.log(err);
    }
    // console.log(tagText);
    var blob = result[req.query.index];
    var data = blob.file_data;
    res.send(data);
  })
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

    con.query("INSERT INTO calendar(userId, startDate, startTime, endTime, name, active, descr) VALUES(?,?,?,?,?,?,?)", ["userId1", req.body.startDate, req.body.startTime, req.body.endTime, req.body.name, true, req.body.descr], function(err, result, field){
          if(err) throw err;
    });

    con.query("SELECT * FROM calendar", function(err, result, field){
         if(err) throw err;
         console.log("calendar table below:");
         console.log(result);
     });
});

//Contacts
app.post('/contacts', urlencodedParser, (req, res) => {

  // Redirects to home page after form submission
  res.writeHead(302, {
      'Location': '/contacts.html'
  });
  res.end();

  // SQL queries
  con.query("USE brainbank", function(err, result, fields){
      if(err) throw err;
      console.log("Set database to brainbank");
  });

  //Create calendar table
  con.query("CREATE TABLE IF NOT EXISTS contacts(id Int AUTO_INCREMENT Not Null Primary Key, userID TEXT NOT NULL, name Text Not NULL, relationship TEXT NOT NULL)", function(err, result, fields){
    if(err) throw err;
    console.log("Created contacts table in database");
});

  con.query("INSERT INTO contacts(userId, name, relationship) VALUES(?,?,?)", [req.body.userId, req.body.name, req.body.relationship], function(err, result, field){
        if(err) throw err;
  });

  con.query("SELECT * FROM contacts", function(err, result, field){
       if(err) throw err;
       console.log(result);
   });
});


/* ******************* Listener ******************* */

// Server on port 8082
app.listen(8082);