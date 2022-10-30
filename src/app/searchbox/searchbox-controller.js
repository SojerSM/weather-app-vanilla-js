import * as model from './searchbox-model';
import searchboxView from './searchbox-view.js';

export const controlWeatherData = async function () {
  model.loadLocation(searchboxView.getQuery());
};

const init = async function () {
  searchboxView.addHandlerSearch(controlWeatherData);
};

init();
