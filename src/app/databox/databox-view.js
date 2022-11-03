import { calcKelvinToCelsius } from '../utilities/helpers.js';

class DataboxView {
  _tempElement = document.querySelector('.databox-temp');
  _weatherElement = document.querySelector('.databox-weather-title');
  _dateElement = document.querySelector('.databox-current-date');
  _humidityElement = document.querySelector('#humidity');
  _feelslikeElement = document.querySelector('#feelslike');
  _cloudElement = document.querySelector('#cloud-cover');
  _windElement = document.querySelector('#wind-speed');

  constructor() {}

  updateDataboxWrapper(data) {
    this._tempElement.textContent = `${calcKelvinToCelsius(data.temp)}°C`;
    this._weatherElement.textContent = data.weather;
    // Date builder need to be added
    this._humidityElement.textContent = data.humidity;
    this._feelslikeElement.textContent = `${calcKelvinToCelsius(
      data.feelsLike
    )}°C`;
    this._cloudElement.textContent = data.clouds;
    this._windElement.textContent = data.windSpeed;
  }
}

export default new DataboxView();
