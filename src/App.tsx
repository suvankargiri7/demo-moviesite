import React , { FunctionComponent } from "react";
import "./App.css";
import { ThemeProvider } from '@mui/material/styles';
import { defaultTheme } from './themes/default';
import { Routes, Route } from "react-router-dom";
import { createTheme, useTheme } from '@mui/material/styles';
import Home from "./features/home";


const App : FunctionComponent = () => {

  const theme = useTheme();
  

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
      <Routes>
        <Route path="/" element={<Home />} key="/" />
      </Routes>
    </div>
    </ThemeProvider>
    
  );
}

export default App;
