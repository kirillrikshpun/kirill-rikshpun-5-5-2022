import { SET_WEATHER, SET_WEATHER_LOADING } from "../actions/weather.actions";

const initialState = {
  weather: [],
  isWeatherLoading: true,
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_WEATHER:
      return {
        ...state,
        weather: payload,
      };

    case SET_WEATHER_LOADING:
      return {
        ...state,
        isWeatherLoading: payload,
      };
    default:
      return state;
  }
}
