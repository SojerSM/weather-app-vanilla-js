import * as model from './app-model';
import searchboxView from './searchbox/searchbox-view.js';

const controlWeatherData = async function () {
  try {
    await model.loadLocation(searchboxView.getQuery());
    await model.loadWeatherData();
    searchboxView.updateLocationWrapper(
      model.state.name,
      model.state.weather.country
    );
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

const init = async function () {
  searchboxView.addHandlerSearch(controlWeatherData);
};

init();
