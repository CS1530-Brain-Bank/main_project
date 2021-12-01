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
  getTasks()
}

const getTasks = () => {
  var xhr = new XMLHttpRequest();
  xhr.open( "GET", "http://localhost:8082/displayTasks");
  xhr.onload = function( e ) {
    data = this.response;
    parsedData = JSON.parse(data);
    console.log(parsedData.uData);
    document.querySelector('.tasks').innerHTML = parsedData.uData;
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