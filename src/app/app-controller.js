import * as model from './app-model';
import searchboxView from './searchbox/searchbox-view.js';
import databoxView from './databox/databox-view';

const controlWeatherData = async function () {
  try {
    await model.loadLocation(searchboxView.getQuery());
    await model.loadWeatherData();

    if (!model.state) return;

    searchboxView.updateLocationWrapper(
      model.state.currLocation.name,
      model.state.weather.country
    );
    databoxView.updateDataboxWrapper(model.state.weather);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

const init = async function () {
  searchboxView.addHandlerSearch(controlWeatherData);
};

init();
