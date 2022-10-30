import * as model from '../searchbox/searchbox-model.js';

export const controlWeatherData = async function () {
  model.loadWeatherData('London');
};
