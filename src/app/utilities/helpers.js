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
