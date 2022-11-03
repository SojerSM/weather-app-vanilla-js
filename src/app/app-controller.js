import * as model from './app-model';
import searchboxView from './searchbox/searchbox-view.js';
import databoxView from './databox/databox-view';

const controlWeatherData = async function () {
  try {
    await model.loadLocation(searchboxView.getQuery());
    await model.loadWeatherData(
      model.state.currLocation.latitude,
      model.state.currLocation.longitude
    );

    if (!model.state) return;

    searchboxView.updateLocationWrapper(
      model.state.weather.name,
      model.state.weather.country
    );
    databoxView.updateDataboxWrapper(model.state.weather);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

const controlGeolocation = function () {
  model.loadCurrentPosition();
};

const init = function () {
  controlGeolocation();
  searchboxView.addHandlerSearch(controlWeatherData);
};

init();
