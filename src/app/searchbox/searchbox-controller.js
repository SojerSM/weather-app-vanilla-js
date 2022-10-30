import * as model from '../searchbox/searchbox-model.js';
import searchboxView from './searchbox-view.js';

export const controlWeatherData = async function () {
  model.loadWeatherData(searchboxView.getQuery());
};

export const controlSearchboxEvents = function () {
  searchboxView.addHandlerSearch(controlWeatherData);
};
