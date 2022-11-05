import * as config from './utilities/config';
import { getGeolocation } from './utilities/helpers';

export const state = {
  currLocation: {},
  weather: {},
  forecast: [],
};

export const loadForecastData = async function (lat, lon) {
  try {
    const request = await fetch(
      `${config.API_FUTURE_URL}lat=${lat}&lon=${lon}&appid=${config.API_KEY}`
    );
    const data = await request.json();

    for (let i = 0; i < 5; i++) {
      state.forecast.push(createForecastObject(data.list[i]));
    }

    console.log(state.forecast);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

export const loadAnyLocation = async function (cityName) {
  try {
    const request = await fetch(
      `${config.API_DIRECT_URL}q=${cityName}&appid=${config.API_KEY}`
    );
    const data = await request.json();
    state.currLocation = createCurrLocationObject(data[0]);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
  console.log(state);
};

export const loadWeatherData = async function (lat, lon) {
  try {
    const request = await fetch(
      `${config.API_STD_URL}lat=${lat}&lon=${lon}&appid=${config.API_KEY}`
    );
    const data = await request.json();
    state.weather = createWeatherObject(data);
  } catch (err) {
    console.log(`Erorr: ${err}`);
  }
};

export const loadInitialLocation = async function () {
  try {
    const position = await getGeolocation();
    state.currLocation.latitude = position.coords.latitude;
    state.currLocation.longitude = position.coords.longitude;
    await getCityName(
      state.currLocation.latitude,
      state.currLocation.longitude
    );
  } catch (err) {
    console.log(`Error: ${err}`);
  }
  console.log(state);
};

const getCityName = async function (lat, lon) {
  try {
    const request = await fetch(
      `${config.API_REVERSE_URL}lat=${lat}&lon=${lon}&limit=${config.REV_LIM_RESULTS}&appid=${config.API_KEY}`
    );
    const data = await request.json();
    state.currLocation.cityName = data[0].name;
  } catch (err) {
    console.log(`Error: ${err}`);
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
    icon: data.weather[0].icon,
    name: data.name,
  };
};

const createCurrLocationObject = function (data) {
  return {
    latitude: data.lat,
    longitude: data.lon,
    cityName: data.name,
  };
};

const createForecastObject = function (data) {
  return {
    date: data.dt_txt.slice(0, 9),
    temp: data.main.temp,
    weather: data.weather[0].main,
  };
};
