const currDay = new Date();

export const calcKelvinToCelsius = function (value) {
  return Math.round(value - 273.15);
};

export const getGeolocation = async function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error)
    );
  });
};

export const dateBuilder = function () {
  const dayOfWeek = currDay.toLocaleString('en-GB', { weekday: 'long' });
  const dayOfMonth = currDay.getDate();
  const month = currDay.toLocaleString('en-GB', { month: 'long' });
  const year = currDay.getFullYear();
  return `${dayOfWeek} ${dayOfMonth}, ${month.slice(0, 3)} '${String(
    year
  ).slice(2)}`;
};

export const getCurrTime = function () {
  const hour = `${currDay.getHours()}`.padStart(2, '0');
  const min = `${currDay.getMinutes()}`.padStart(2, '0');
  return `${hour}:${min}`;
};
