import React, { useEffect } from "react";
import {Typography, Button, CardContent, Card, Grid, Box} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import {
  addToFavourite,
  isFavourite,
  removeFromFavorite,
} from "../redux/actions/favorite.actions";

import { useDispatch, useSelector } from "react-redux";

const CityPage = ({ temperatureInC, weatherData }) => {
  const dispatch = useDispatch();
  const favoriteArr = useSelector((state) => state.favorite.favorite);
  const statusFavourite = useSelector((state) => state.favorite.isFourite);

  useEffect(() => {
    dispatch(isFavourite(weatherData));
  }, [favoriteArr]);

  const dayTime = (city) => {
    var today = new Date();
    if (today.getHours() >= 7 && today.getHours() <= 17) {
      return city.weather[0].Day.IconPhrase;
    } else {
      return city.weather[0].Night.IconPhrase;
    }
  };

  const displayDays = (dayN) => {
    let day;

    const objDay = [
      {
        day: "Sun",
      },
      {
        day: "Mon",
      },
      {
        day: "Tus",
      },
      {
        day: "Wed",
      },
      {
        day: "Ths",
      },
      {
        day: "Fri",
      },
      {
        day: "Sat",
      },
    ];

    objDay.forEach((elem, idx) => {
      if (dayN === idx) {
        day = elem.day;
      }
    });
    return day;
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card sx={{ margin: "1rem" }} variant="outlined">
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Card
              sx={{
                textAlign: "center",
              }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 28 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {weatherData.cityName}
                </Typography>
                <Typography variant="h5" component="div">
                  {temperatureInC(weatherData.weather[0])}
                </Typography>
              </CardContent>
            </Card>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  fontSize: 20,
                  height: "6rem",
                  width: "9rem",
                }}
                onClick={() => {
                  statusFavourite
                    ? dispatch(removeFromFavorite(weatherData))
                    : dispatch(addToFavourite(weatherData));
                }}
                size="small"
                startIcon={
                  statusFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />
                }
              >
                {statusFavourite ? <>remove</> : <>add</>}
              </Button>
            </Box>
          </Box>
          <Typography
            sx={{ textAlignLast: "center", padding: "4rem", fontSize: 48 }}
            color="text.secondary"
            gutterBottom
          >
            {dayTime(weatherData)}
          </Typography>

          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            {weatherData.weather.map((elem, idx) => {
              const d = new Date(elem.Date);
              return (
                <Card
                  key={idx}
                  sx={{
                    width: "15vw",
                    textAlign: "center",
                    transitionDuration: "0.3s",
                    height: "12vw",
                  }}
                >
                  <CardContent>{displayDays(d.getDay())}</CardContent>
                  <CardContent>{temperatureInC(elem)}</CardContent>
                </Card>
              );
            })}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CityPage;
