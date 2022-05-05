import React from "react";
import { Link, Outlet } from "react-router-dom";
import { setWeather } from "../redux/actions/weather.actions";
import { useDispatch } from "react-redux";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Tooltip, Switch } from "@mui/material";

function NavBar({ mode, setMode }) {
  const dispatch = useDispatch();
  return (
    <AppBar position="static">
      <Box sx={{ display: "flex" }}>
        <Container maxWidth="xl">
          <Toolbar>
            <Button
              key={"home"}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link
                style={{ textDecoration: "none", color: "white" }}
                onClick={() => dispatch(setWeather({}))}
                to="/"
              >
                home
              </Link>
            </Button>
            <Button
              key={"favourite"}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/favorite"
              >
                favorite
              </Link>
            </Button>
            <Outlet />
          </Toolbar>
        </Container>
        <Box sx={{display: "flex", alignItems: "center", margin: "1vh"}}>
          <Tooltip title={mode ? "dark mode" : "light mode"}>
            <Switch
              color="default"
              checked={mode}
              onChange={() => setMode(!mode)}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Tooltip>
        </Box>
      </Box>
    </AppBar>
  );
}

export default NavBar;
