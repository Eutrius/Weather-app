const getCities = (cityName) => {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`;
  return fetchUrl(url);
};

const getWeather = (cityLon, cityLat) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${cityLon}&lon=${cityLat}&units=metric&appid=${API_KEY}`;
  return fetchUrl(url);
};

const fetchUrl = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      return await response.json();
    }
    throw new Error("Network response was not OK");
  } catch (error) {
    console.error(error);
  }
};

export default { getCities, getWeather };
