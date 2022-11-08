import { calcKelvinToCelsius } from '../utilities/helpers.js';
import { API_ICON_URL } from '../utilities/config.js';

class DataboxView {
  _tempElement = document.querySelector('.databox-temp');
  _weatherElement = document.querySelector('.databox-weather-title');
  _dateElement = document.querySelector('.databox-current-date');
  _humidityElement = document.querySelector('#humidity');
  _feelslikeElement = document.querySelector('#feelslike');
  _cloudElement = document.querySelector('#cloud-cover');
  _windElement = document.querySelector('#wind-speed');
  _pressureElement = document.querySelector('#pressure');
  _iconElement = document.querySelector('#databox-weather-icon');
  _timeElement = document.querySelector('.databox-title-time');

  _forecastWrapper = document.querySelector('.databox-future-wrapper');

  updateDataboxWrapper(data, date, time) {
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
    this._iconElement.src = `${API_ICON_URL}${data.icon}.png`;
    this._timeElement.textContent = time;
  }

  generateForeacstMarkup(data) {
    this._clearView(this._forecastWrapper);

    data.forEach((item) => {
      const markup = `
        <div class="databox-future-element">
          <p class="future-element-date">${item.date}</p>
          <p class="future-element-temp">${calcKelvinToCelsius(item.temp)}°C</p>
          <div class="future-element-weather-wrapper">
            <p class="future-element-weather">${item.weather}</p>
            <img src="${API_ICON_URL}${
        item.icon
      }.png" alt="#" id="future-element-icon" />
          </div>
        </div>`;
      this._forecastWrapper.insertAdjacentHTML('beforeend', markup);
    });
  }

  _clearView(wrapper) {
    wrapper.innerHTML = '';
  }
}

export default new DataboxView();
