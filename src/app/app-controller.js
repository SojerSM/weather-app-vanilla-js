import * as model from './app-model';
import { dateBuilder, getCurrTime } from './utilities/helpers';
import searchboxView from './searchbox/searchbox-view.js';
import databoxView from './databox/databox-view';
import appView from './spinner/spinnerView';

const currLocation = model.state.currLocation;
const weather = model.state.weather;

// Loading actual data from model.state obj & updating views
const controlWeatherData = async function () {
  try {
    await model.loadWeatherData(currLocation.latitude, currLocation.longitude);
    await model.loadForecastData(currLocation.latitude, currLocation.longitude);

    if (!model.state) return;

    searchboxView.updateLocationWrapper(currLocation.cityName, weather.country);
    databoxView.updateDataboxWrapper(weather, dateBuilder(), getCurrTime());
    databoxView.generateForecastMarkup(model.state.forecast);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
  appView.displayAppContainer();
};

// Control data flow with a location read from input bar
const controlAnyLocation = async function () {
  try {
    await model.loadAnyLocation(searchboxView.getQuery());
    await controlWeatherData();
  } catch (err) {
    console.log(`Error: ${err}`);
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
  appView.renderSpinner();
  controlGeolocation();
  searchboxView.addHandlerSearch(controlAnyLocation);
};

init();
