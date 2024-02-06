const getCities = async (name) => {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${API_KEY}`,
    );
    if (response.ok) {
      return await response.json();
    }
    throw new Error("Network response was not OK");
  } catch (error) {
    console.error(error);
  }
};

const getWeather = async (lon, lat) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
    );
    if (response.ok) {
      return await response.json();
    }
    throw new Error("Network response was not OK");
  } catch (error) {
    console.error(error);
  }
};

export default { getCities, getWeather };
