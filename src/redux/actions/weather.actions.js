import axios from "axios";
export const SET_WEATHER = "SET_WEATHER";
export const SET_WEATHER_LOADING = "SET_WEATHER_LOADING";

export const fetchWeather = async (dispatch, cityName, enqueueSnackbar) => {
  try {
    dispatch(weatherLoading(true));
    const optionsCities = {
      method: "GET",
      cors: true,
      url: "https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/locations/v1/cities/search",
      params: { q: cityName, apikey: "QIImPUoeGQGPhLqABhS5CLuxCRIFGW76" },
    };

    const responseCity = await axios.request(optionsCities);

    const optionsWeather = {
      method: "GET",
      cors: true,
      url: `https://cors-anywhere.herokuapp.com/http://dataservice.accuweather.com/forecasts/v1/daily/5day/${responseCity.data[0].Key}`,
      params: { apikey: "QIImPUoeGQGPhLqABhS5CLuxCRIFGW76" },
    };
    const responseWeather = await axios.request(optionsWeather);

    const weatherObj = {
      cityName: responseCity.data[0].EnglishName,
      weather: responseWeather.data.DailyForecasts,
      key: responseCity.data[0].Key,
    };

    dispatch(weatherLoading(false));
    dispatch(setWeather(weatherObj));
  } catch (err) {
    if (err.request.status === 503) {
      dispatch(weatherLoading(false));
      enqueueSnackbar("Service Unavailable", { variant: "error" });
    }
  }
};

export function weatherLoading(payload) {
  return {
    type: SET_WEATHER_LOADING,
    payload: payload,
  };
}

export function setWeather(payload) {
  return {
    type: SET_WEATHER,
    payload: payload,
  };
}
