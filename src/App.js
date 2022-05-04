import React from 'react'
import {
  Routes,
  Route,
} from 'react-router-dom'

import { SnackbarProvider } from 'notistack';
import Home from './Home/Home'
import Favourites from './Favourites/Favourites';
// import "../src/App.css"
import NavBar from './NavBar/NavBar';


function App() {
  return (
    <SnackbarProvider maxSnack={3}>
        <NavBar/>
        <Routes>
            <Route
              index
              element={<Home />}
            />
            <Route
              path="favorite"
              element={<Favourites />}
            />
        </Routes>
    </SnackbarProvider>
        
  );
}

export default App;
