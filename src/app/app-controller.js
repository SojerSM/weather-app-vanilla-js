import * as model from './app-model';
import { dateBuilder, getCurrTime, getRandomNumber } from './utilities/helpers';
import searchboxView from './searchbox/searchbox-view.js';
import databoxView from './databox/databox-view';
import spinnerView from './spinner/spinnerView';
import errorView from './error/errorView';

// Loading actual data from model.state obj & updating views
const controlWeatherData = async function () {
  try {
    await model.loadWeatherData(
      model.state.currLocation.latitude,
      model.state.currLocation.longitude
    );
    await model.loadForecastData(
      model.state.currLocation.latitude,
      model.state.currLocation.longitude
    );

    if (!model.state) return;

    searchboxView.updateLocationWrapper(
      model.state.currLocation.cityName,
      model.state.weather.country
    );
    databoxView.updateDataboxWrapper(
      model.state.weather,
      dateBuilder(),
      getCurrTime()
    );
    databoxView.generateForecastMarkup(model.state.forecast);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
  spinnerView.displayAppContainer();
};

// Control data flow with a location read from input bar
const controlAnyLocation = async function () {
  try {
    errorView._clearView();
    await model.loadAnyLocation(searchboxView.getQuery());
    await controlWeatherData();
  } catch (err) {
    errorView.renderErrorElement(model.state.errorMessages.inputError);
  }
};

// Control data flow with a geolocation API
const controlGeolocation = async function () {
  try {
    await model.loadInitialLocation();
    await controlWeatherData();
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

const init = function () {
  spinnerView.renderSpinner();
  controlGeolocation();
  searchboxView.addHandlerSearch(controlAnyLocation);
};

init();
