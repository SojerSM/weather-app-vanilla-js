import { API_KEY, API_DIRECT_URL } from '../config';

const state = {
  latitude: 0,
  longitude: 0,
  name: '',
  state: '',
};

export const loadLocation = async function (cityName) {
  try {
    const request = await fetch(
      `${API_DIRECT_URL}q=${cityName}&appid=${API_KEY}`
    );
    const data = await request.json();
    updateState(data[0]);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
  console.log(state);
};

const updateState = function (data) {
  state.latitude = data.lat;
  state.longitude = data.lon;
  state.name = data.name;
  state.state = data.state;
};
