import * as controller from './searchbox/searchbox-controller.js';

const init = async function () {
  controller.controlWeatherData();
  console.log('main.js works');
};

init();
