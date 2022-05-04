
import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent';
import {setWeather} from '../redux/actions/weather.actions';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";

function Favourites() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const favouritesCities = useSelector((state) => state.addFavorite.favorite)

  const dayOrNightTime = (city) => {
    var today = new Date()
    if (today.getHours() >= 7 && today.getHours() <= 17 ){
    return city.weather[0].Day.IconPhrase;
    } else {
    return city.weather[0].Night.IconPhrase;
    }
  }

  const tempInC = (res) => {
    const avarageF = (res.weather[0].Temperature.Maximum.Value + res.weather[0].Temperature.Minimum.Value)/2
    const avarageC = (avarageF - 32)/1.8
    return Math.round(avarageC)
  }

  return (
    <Grid container spacing={2}>
           { favouritesCities.map((elem, idx) => {
                return (
                        <Grid item xs={6} key={idx}>
                            <Box 
                               sx={{
                                  p: 2,
                                  display: 'grid',
                                  gridTemplateColumns: { md: '1fr 1fr' },
                                  gap: 2,
                            }}>
                            <Card onClick = {() => {navigate('/'); dispatch(setWeather(elem))}}> 
                              <CardContent>{elem.cityName}</CardContent>
                              <CardContent>{tempInC(favouritesCities[idx])}</CardContent> 
                              <CardContent>{dayOrNightTime(favouritesCities[idx])}</CardContent> 
                            </Card>
                          </Box>
                        </Grid>              
                )
              }) 
            }
    </Grid>

  );
}

export default Favourites;
