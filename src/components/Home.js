import React, { useRef, useEffect } from "react";
import { useSnackbar } from "notistack";
import CityPage from "./CityPage";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import { Search } from "@mui/icons-material";
import { throttle } from "lodash";

import { fetchWeather } from "../redux/actions/weather.actions";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

function Home({ temperatureInC }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const throttled = useRef(
    throttle(
      (newValue) => {
        fetchWeather(dispatch, newValue, enqueueSnackbar);
      },
      2000,
      { trailing: true }
    )
  );
  const weatherObj = useSelector((state) => state.weather.weather);
  const isLoading = useSelector((state) => state.weather.isWeatherLoading);

  const handleInputThrottled = (evt) => {
    if (evt.length) {
      throttled.current(evt);
    }
  };

  useEffect(() => {
    if (_.isEmpty(weatherObj)) {
      handleInputThrottled("Tel Aviv");
    }
  }, [weatherObj]);

  return (
    <Box>
      <Box sx={{ display: "flex", padding: "1rem" }}>
        <TextField
          fullWidth
          onChange={(event) => handleInputThrottled(event.target.value)}
          label="Search"
          InputProps={{
            endAdornment: (
              <InputAdornment position={"end"}>
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {isLoading || _.isEmpty(weatherObj) ? (
        <></>
      ) : (
        <CityPage temperatureInC={temperatureInC} weatherData={weatherObj} />
      )}
    </Box>
  );
}

export default Home;
