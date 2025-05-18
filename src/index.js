function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date (response.data.time * 1000);
    let iconElement = document.querySelector("#icon");
    
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon">`
    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon">`;


getForecast(response.data.city);

}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let dayIndex = date.getDay();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}


function searchCity(city) {
let apiKey = "0f47325f67190a100b7be47t71b9a1ob";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
event.preventDefault();
let searchInput = document.querySelector("#search-form-input");
let cityElement = document.querySelector("#city");

cityElement.innerHTML = searchInput.value;

searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "0f47325f67190a100b7be47t71b9a1ob";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHTML = `<div class="weather-forecast">`;

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML += `
        <div class="weather-forecast-day">
          <div class="weather-forecast-date">${formatDay(day.time)}</div>
          <div class="weather-forecast-icon">
         <img src="${day.condition.icon_url}" />
            </div>
            <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature"><strong>${Math.round(day.temperature.maximum)}°</strong></div>
            <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
          </div>
        </div>`;
    }
  });

  forecastHTML += `</div>`; 

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}


let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

