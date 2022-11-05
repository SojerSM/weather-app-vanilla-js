import * as model from './app-model';
import { dateBuilder } from './utilities/helpers';
import searchboxView from './searchbox/searchbox-view.js';
import databoxView from './databox/databox-view';

// Loading actual data from model.state obj & updating views
const controlWeatherData = async function () {
  try {
    await model.loadWeatherData(
      model.state.currLocation.latitude,
      model.state.currLocation.longitude
    );
    await model.loadFutureWeatherData(
      model.state.currLocation.latitude,
      model.state.currLocation.longitude
    );

    if (!model.state) return;

    searchboxView.updateLocationWrapper(
      model.state.currLocation.cityName,
      model.state.weather.country
    );
    databoxView.updateDataboxWrapper(model.state.weather, dateBuilder());
  } catch (err) {
    console.log(`Error: ${err}`);
  }
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
  controlGeolocation();
  searchboxView.addHandlerSearch(controlAnyLocation);
  dateBuilder();
};

init();
