import Service from "./service.js";

const handleSearch = async (event) => {
  event.preventDefault();
  const cityInput = document.getElementById("city-input");
  const city = cityInput.value;
  cityInput.value = "";

  hideCity();
  const cities = await Service.getCities(city);
  if (cities.length > 0) {
    renderResult(showCities(cities));
  } else {
    renderResult(invalidCity());
  }
};

const handleOnCityClick = async (event, city, cityName) => {
  removeResult();
  const weatherData = await Service.getWeather(city.lon, city.lat);
  showCity(weatherData, cityName);
};

const renderResult = (element) => {
  const resultDiv = document.getElementById("result");
  const currentResult = resultDiv.firstChild;
  if (currentResult) {
    resultDiv.replaceChild(element, currentResult);
  } else {
    resultDiv.appendChild(element);
  }
  resultDiv.classList.remove("hidden");
};

const removeResult = () => {
  const resultDiv = document.getElementById("result");
  resultDiv.removeChild(resultDiv.firstChild);
  resultDiv.classList.add("hidden");
};

const hideCity = () => {
  const cityDiv = document.getElementById("city");
  cityDiv.classList.replace("flex", "hidden");
};

const invalidCity = () => {
  const div = document.createElement("div");
  div.id = "invalid-div";
  div.className = "bar-white error";
  div.textContent = "Invalid city name. Please, try again!";
  return div;
};

const showCity = (data, cityName) => {
  const cityDiv = document.getElementById("city");
  const icon = document.getElementById("icon");
  const temperature = document.getElementById("temperature");
  const weather = document.getElementById("weather");
  const location = document.getElementById("location");
  const humidity = document.getElementById("humidity");
  const feelsLike = document.getElementById("feelslike");
  const wind = document.getElementById("wind");

  const weatherCondition = data.weather[0];
  const main = data.main;

  icon.src = `https://openweathermap.org/img/wn/${weatherCondition.icon}@2x.png`;
  icon.alt = `${weatherCondition.description}`;
  temperature.textContent = `${Math.round(main.temp)}°C`;
  weather.textContent = `${weatherCondition.main}`;
  location.textContent = `${cityName}`;
  humidity.textContent = `${main.humidity}%`;
  feelsLike.textContent = `${Math.round(main.feels_like)}°C`;
  wind.textContent = `${data.wind.speed}m/s`;

  cityDiv.classList.replace("hidden", "flex");
};

const showCities = (cities) => {
  const div = document.createElement("div");
  div.id = "city-list";
  cities.forEach((city) => {
    const cityDiv = document.createElement("div");
    const cityName = `${city.name}${city.state ? `, ${city.state}` : ""}, ${city.country}`;
    cityDiv.className = "bar-white city";
    cityDiv.addEventListener("click", (event) =>
      handleOnCityClick(event, city, cityName),
    );
    cityDiv.textContent = cityName;

    div.appendChild(cityDiv);
  });
  return div;
};

const cityForm = document.getElementById("city-form");
cityForm.addEventListener("submit", handleSearch);
