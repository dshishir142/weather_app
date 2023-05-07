
//search

let county = document.getElementById("display");
county.value = `kent`;
let place = county.value;
let but = document.getElementById("search");
but.addEventListener("click", () => {
    place = county.value;
    fetchdata();
    fetchHistory();
})



//fetch data
function fetchdata(){
fetch(`http://localhost/weather/index.php?place=${place}&all_data`)
.then(a => a.json())
.then(data => {
    const condi = data.condi;
    const temp = data.temp;
    const country = data.country;
    const wind = data.wind;
    const humi = data.humi;

//date
const dateElement = document.getElementById('date');
const currentDate = new Date();
dateElement.textContent = `Date: ${currentDate.toDateString()}`;

//temperature
const tempElement = document.getElementById("tem");
tempElement.textContent = `${temp}°C`;

//city
const cityElement = document.getElementById("city");
cityElement.textContent = country;

//humidity
const humidityElement = document.getElementById("humidity");
humidityElement.innerHTML = `Humidity:&nbsp;&nbsp;${humi}&nbsp;%`;

//windspeed
const windElement = document.getElementById("wind");
windElement.innerHTML = `Windspeed:&nbsp;&nbsp;${wind}&nbsp;m/s`;

//condition
const condiElement = document.getElementById("condi");
condiElement.innerHTML = condi;
console.log(data.icon);

//icon
const iconCode = data.icon;
let iconUrl;

if (iconCode === "01d" || iconCode === "01n") {
  iconUrl = "images used/sunny.png";
} else if (iconCode === "02d" || iconCode === "02n" || iconCode === "03d" || iconCode === "03n") {
  iconUrl = "images used/partlycloud.png";
} else if (iconCode === "04d" || iconCode === "04n") {
  iconUrl = "images used/clouds.png";
} else if (iconCode === "09d" || iconCode === "09n" || iconCode === "10d" || iconCode === "10n") {
  iconUrl = "images used/rainy.png";
} else if (iconCode === "11d" || iconCode === "11n") {
  iconUrl = "images used/rainWithLightning.png";
} else if (iconCode === "13d" || iconCode === "13n") {
  iconUrl = "images used/snowfall.png";
} else if (iconCode === "50d" || iconCode === "50n") {
  iconUrl = "images used/windy.png";
} else {
  iconUrl = "images used/rainbow.png";
}

const condiImage = document.getElementById("condi_image");
condiImage.src = iconUrl;

})
}

//function to fetch the data that was previously recorded
function fetchHistory(){
  let table = document.getElementById("table");
  table.innerHTML = `
    <tr class="top-head">
      <td>Name</td>
      <td>Date</td>
      <td>Temperature</td>
      <td>condition</td>
      <td>Humidity</td>
    </tr>`;

    //fetch data from history.php file
  fetch(`http://localhost/weather/history.php?place=${place}`)
  .then(a => a.json())
  .then(data => {
    //loop through each elements that was received as json
    data.forEach(weather => {
      tr = document.createElement("tr");
      //value of each element country,date,temperature,weather condition and the humidity
      tr.innerHTML = `
        <td>${weather.country}</td>
        <td>${weather.Date}</td>
        <td>${weather.temp}</td>
        <td>${weather.condi}</td>
        <td>${weather.humi}</td>
      `;
      table.appendChild(tr);
    });
  })
}
//call function 
fetchHistory()

fetchdata();