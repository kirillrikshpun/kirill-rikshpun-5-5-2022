import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import Paper from "@mui/material/Paper"

import Home from "./components/Home";
import Favourites from "./components/Favourites";
import NavBar from "./components/NavBar";

function App() {
  const [mode, setMode] = useState(true)
  const temperatureInC = (temp) => {
    const avarageF =
      (temp.Temperature.Maximum.Value + temp.Temperature.Minimum.Value) / 2;
    const avarageC = (avarageF - 32) / 1.8;
    return Math.round(avarageC) + "°C";
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode ? "light" : "dark",
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <Paper sx={{ height: "100vh" }}>
          <NavBar mode = {mode} setMode={setMode} />
          <Routes>
            <Route index element={<Home temperatureInC={temperatureInC} />} />
            <Route
              path="favorite"
              element={<Favourites temperatureInC={temperatureInC} />}
            />
          </Routes>
        </Paper>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
