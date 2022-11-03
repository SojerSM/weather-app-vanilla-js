import { API_KEY, API_DIRECT_URL, API_STD_URL } from './utilities/config';

export const state = {
  currLocation: {},
  weather: {},
};

export const loadLocation = async function (cityName) {
  try {
    const request = await fetch(
      `${API_DIRECT_URL}q=${cityName}&appid=${API_KEY}`
    );
    const data = await request.json();
    state.currLocation = createCurrLocationObject(data[0]);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

export const loadWeatherData = async function (lat, lon) {
  try {
    const request = await fetch(
      `${API_STD_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    const data = await request.json();
    state.weather = createWeatherObject(data);
    console.log(state);
  } catch (err) {
    console.log(`Erorr: ${err}`);
  }
};

export const loadCurrentPosition = function () {
  const successCallback = function (position) {
    state.currLocation.latitude = position.coords.latitude;
    state.currLocation.longitude = position.coords.longitude;
  };

  const errorCallback = (error) => {
    console.log(error);
  };

  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  console.log(state);
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
  };
};
