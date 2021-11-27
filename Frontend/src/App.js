import React, { useEffect, createContext, useReducer, useContext } from "react";
import { HelmetProvider } from "react-helmet-async";

import "react-perfect-scrollbar/dist/css/styles.css";

import { ThemeProvider } from "@mui/material/styles";

import GlobalStyles from "./components/GlobalStyles";
import theme from "./theme";

import AppRoutes from "./components/appRoutes";

const App = () => {
  return (
    <>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <AppRoutes />
        </ThemeProvider>
      </HelmetProvider>
    </>
  );
};

export default App;
