import { API_KEY, API_DIRECT_URL } from '../config';

export const loadLocation = async function (cityName) {
  try {
    const request = await fetch(
      `${API_DIRECT_URL}q=${cityName}&appid=${API_KEY}`
    );
    const data = await request.json();
    console.log(data);
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};
