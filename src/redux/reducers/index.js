import { combineReducers } from "redux";
import favorite from "./favorite.reducers.js";
import weather from './weather.reducers.js'

export default combineReducers({
    favorite: favorite,
    weather: weather
});
