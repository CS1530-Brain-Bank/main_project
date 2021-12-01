const date = new Date();

const renderCal = () => {
  date.setDate(1);

  const firstDayIndex = date.getDay();

  const numDays = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();

  const prevLastday = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

  const lastDayIndex = new Date(date.getFullYear(), date.getMonth()+1, 0).getDay();

  const monthDays = document.querySelector('.days');

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  document.querySelector('.date h1').innerHTML = months[date.getMonth()];
  document.querySelector('.date p').innerHTML = new Date().toDateString();

  let days = "";

  for (let x = firstDayIndex; x > 0; x --) {
    days += `<div class="prev-date">${prevLastday - x + 1}</div>`
  }

  for (let i = 1; i <= numDays; i++) {
    if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
      days += `<div class="today">${i}</div>`
    } else{
      days += `<div>${i}</div>`
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`
    monthDays.innerHTML = days;
  }

}

const getTasks = () => {
  var mysql = require('mysql2');
  var con = mysql.createConnection({
    host: "localhost",
    // user: "testUser",
    // password: "testUser123#"
    user: "root",
    password: "977EB4CCA8559B0F7C9E920188A7084ED29248CDD12B979C58A19E7ADF57AF80"
  });
  // Sets active database to brainbank database
  con.query("USE brainbank", function(err, result, fields){
    if(err) throw err;
  });
  con.query("SELECT name, startDate, startTime, endTime FROM calendar WHERE userid='userId1'", function(err, result, field){
    if(err) throw err;
    document.querySelector('.tasks').innerHTML = result;
  });
}

document.querySelector('.prev').addEventListener('click', () => {
  date.setMonth(date.getMonth()-1);
  renderCal();
})

document.querySelector('.next').addEventListener('click', () => {
  date.setMonth(date.getMonth()+1);
  renderCal();
})

getTasks()
renderCal()