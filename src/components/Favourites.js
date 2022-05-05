import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import { setWeather } from "../redux/actions/weather.actions";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

function Favourites({ temperatureInC }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favouritesCities = useSelector((state) => state.favorite.favorite);

  const dayOrNightTime = (city) => {
    var today = new Date();
    if (today.getHours() >= 7 && today.getHours() <= 17) {
      return city.weather[0].Day.IconPhrase;
    } else {
      return city.weather[0].Night.IconPhrase;
    }
  };

  return (
    <Grid container spacing={2} columns={{ xs: 6 }}>
      {favouritesCities.map((elem, idx) => {
        return (
          <Grid item xs={2} key={idx}>
            <Box
              sx={{
                p: 2,
                justifyContent: "space-around",
                height: "8rem",
                gridTemplateColumns: { md: "1fr 1fr" },
                gap: 2,
              }}
            >
              <Card
                sx={{
                  cursor: "pointer",
                  textAlign: "center",
                }}
                onClick={() => {
                  navigate("/");
                  dispatch(setWeather(elem));
                }}
              >
                <CardContent>{elem.cityName}</CardContent>
                <CardContent>
                  {temperatureInC(favouritesCities[idx].weather[0])}
                </CardContent>
                <CardContent>
                  {dayOrNightTime(favouritesCities[idx])}
                </CardContent>
              </Card>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default Favourites;
