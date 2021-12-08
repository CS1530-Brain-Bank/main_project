const date = new Date();

const comp = date.toISOString().split("T");

const renderCal = () => {
  date.setDate(1);

  const firstDayIndex = date.getDay();

  const numDays = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();

  const prevLastday = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

  const lastDayIndex = new Date(date.getFullYear(), date.getMonth()+1, 0).getDay();

  const year = date.getFullYear();

  let month = date.getMonth();

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
  var curr = "";

  for (let x = firstDayIndex; x > 0; x --) {
    curr = year.toString() + "" + month.toString() + "" + (prevLastday - x + 1).toString();
    days += `<div class="prev-date" onclick="getTasks(${curr})">${prevLastday - x + 1}</div>`
  }
  month++;
  for (let i = 1; i <= numDays; i++) {
    if (i < 10) {
      curr = year.toString() + "" + month.toString() + "" + 0 + i;
    } else {
      curr = year.toString() + "" + month.toString() + "" + i;
    }
    if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
      days += `<div class="today" onclick="getTasks(${curr})">${i}</div>`
    } else{
      days += `<div onclick="getTasks(${curr})">${i}</div>`
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    if (j < 10) {
      curr = year.toString() + "" + month.toString() + "" + 0 + j;
    } else {
      curr = year.toString() + "" + month.toString() + "" + j;
    }
    days += `<div class="next-date" onclick="getTasks(${curr})">${j}</div>`
    monthDays.innerHTML = days;
  }
}

function getTasks(filter) {
  var xhr = new XMLHttpRequest();
  xhr.open( "GET", "http://localhost:8082/displayTasks");
  xhr.onload = function( e ) {
    data = this.response;
    parsedData = JSON.parse(data);
    let tasks = "";
    let task = "";
    for (let i = 0; i < parsedData.uData.length; i++) {
      let sp = parsedData.uData[i].startDate.split("T")[0].split("-");
      let comp = sp[0] + sp[1] + sp[2];
      console.log(comp);
      if (filter == comp) {
        task = `
        <ul>
          <h3>${parsedData.uData[i].name}</h3>
          <p>Start Date: ${parsedData.uData[i].startDate.split("T")[0]}</p>
          <p>Start Time: ${parsedData.uData[i].startTime}</p>
          <p>End Time: ${parsedData.uData[i].endTime}</p>
          <p>Description: ${parsedData.uData[i].descr}</p>
        </ul>
        `
        tasks += `<div>${task}</div>`
      }
    }
    document.querySelector('.tasks').innerHTML = tasks;
  };
  xhr.send();
}

document.querySelector('.prev').addEventListener('click', () => {
  date.setMonth(date.getMonth()-1);
  renderCal();
})

document.querySelector('.next').addEventListener('click', () => {
  date.setMonth(date.getMonth()+1);
  renderCal();
})

renderCal()