import { calcKelvinToCelsius } from '../utilities/helpers.js';

class DataboxView {
  _tempElement = document.querySelector('.databox-temp');
  _weatherElement = document.querySelector('.databox-weather-title');
  _dateElement = document.querySelector('.databox-current-date');
  _humidityElement = document.querySelector('#humidity');
  _feelslikeElement = document.querySelector('#feelslike');
  _cloudElement = document.querySelector('#cloud-cover');
  _windElement = document.querySelector('#wind-speed');
  _pressureElement = document.querySelector('#pressure');

  _forecastWrapper = document.querySelector('.databox-future-wrapper');

  updateDataboxWrapper(data, date) {
    this._tempElement.textContent = `${calcKelvinToCelsius(data.temp)}°C`;
    this._weatherElement.textContent = data.weather.slice(0, 8);
    this._humidityElement.textContent = data.humidity;
    this._feelslikeElement.textContent = `${calcKelvinToCelsius(
      data.feelsLike
    )}°C`;
    this._cloudElement.textContent = data.clouds;
    this._windElement.textContent = data.windSpeed;
    this._pressureElement.textContent = data.pressure;
    this._dateElement.textContent = date;
  }

  generateForeacstMarkup(data) {
    data.forEach((item) => {
      const markup = `
        <div class="databox-future-element">
          <p class="future-element-date">${item.date}</p>
          <p class="future-element-temp">${calcKelvinToCelsius(item.temp)}°C</p>
          <p class="future-element-weather">${item.weather}</p>
        </div>`;
      this._forecastWrapper.insertAdjacentHTML('afterbegin', markup);
    });
  }
}

export default new DataboxView();
