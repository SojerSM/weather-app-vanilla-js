import { API_KEY, API_DIRECT_URL, API_STD_URL } from '../config';

const state = {
  latitude: 0,
  longitude: 0,
  name: '',
  state: '',
  weather: {},
};

export const loadLocation = async function (cityName) {
  try {
    const request = await fetch(
      `${API_DIRECT_URL}q=${cityName}&appid=${API_KEY}`
    );
    const data = await request.json();
    updateState(data[0]);
    loadWeatherData();
  } catch (err) {
    console.log(`Error: ${err}`);
  }
  console.log(state);
};

const loadWeatherData = async function () {
  try {
    const request = await fetch(
      `${API_STD_URL}lat=${state.latitude}&lon=${state.longitude}&appid=${API_KEY}`
    );
    const data = await request.json();
    state.weather = createWeatherObject(data);
    console.log(state);
  } catch (err) {
    console.log(`Erorr: ${err}`);
  }
};

const createWeatherObject = function (data) {
  return {
    weather: data.weather[0].main,
    temp: data.main.temp,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    pressure: data.main.pressure,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
    country: data.sys.country,
    clouds: data.clouds.all,
    feelsLike: data.main.feels_like,
  };
};

const updateState = function (data) {
  state.latitude = data.lat;
  state.longitude = data.lon;
  state.name = data.name;
  state.state = data.state;
};
