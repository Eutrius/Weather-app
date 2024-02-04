import cities from "./data.js";

const handleSearch = (event) => {
  event.preventDefault();
  const cityInput = document.getElementById("city-input");
  const city = cityInput.value;
  cityInput.value = "";

  hideCity();
  if (city.toLowerCase() === "dublin") {
    renderResult(showCities());
  } else {
    renderResult(invalidCity());
  }
};

const handleOnCityClick = (event, city) => {
  removeResult();
  showCity(city);
};

const renderResult = (element) => {
  const card = document.getElementById("card");
  if (card.childElementCount === 3) {
    card.replaceChild(
      element,
      document.querySelector("#card div:nth-child(2)"),
    );
  } else {
    card.insertBefore(element, card.lastElementChild);
  }
};

const removeResult = () => {
  const card = document.getElementById("card");
  const listDiv = card.children[1];
  card.removeChild(listDiv);
};

const hideCity = () => {
  const cityDiv = document.getElementById("city");
  cityDiv.style.display = "none";
};

const invalidCity = () => {
  const div = document.createElement("div");
  div.id = "invalid-div";
  div.className = "bar-white error";
  div.textContent = "Invalid city name. Please, try again!";
  return div;
};

const showCity = (city) => {
  const cityDiv = document.getElementById("city");
  const icon = document.getElementById("icon");
  const temperature = document.getElementById("temperature");
  const weather = document.getElementById("weather");
  const location = document.getElementById("location");
  const humidity = document.getElementById("humidity");
  const feelsLike = document.getElementById("feelslike");
  const wind = document.getElementById("wind");

  icon.className = `${city.weather.toLowerCase()}`;
  temperature.textContent = `${city.temperature} °C`;
  weather.textContent = `${city.weather}`;
  location.textContent = `${city.city}`;
  humidity.textContent = `${city.humidity} %`;
  feelsLike.textContent = `${city.feelslike} °C`;
  wind.textContent = `${city.windspeed} km/h`;

  cityDiv.style.display = "flex";
};

const showCities = () => {
  const div = document.createElement("div");
  div.id = "city-list";
  cities.forEach((city) => {
    const cityDiv = document.createElement("div");
    cityDiv.className = "bar-white city";
    cityDiv.textContent = city.city;
    cityDiv.addEventListener("click", (event) =>
      handleOnCityClick(event, city),
    );
    div.appendChild(cityDiv);
  });
  div.firstElementChild.className = "bar-white city top-city";
  div.lastElementChild.className = "bar-white city bottom-city";
  return div;
};

const cityForm = document.getElementById("city-form");
cityForm.addEventListener("submit", handleSearch);
