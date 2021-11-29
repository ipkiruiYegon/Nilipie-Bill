import React, { useEffect, createContext, useReducer, useContext } from "react";
import { HelmetProvider } from "react-helmet-async";

import "react-perfect-scrollbar/dist/css/styles.css";

import { ThemeProvider } from "@mui/material/styles";

import GlobalStyles from "./components/GlobalStyles";
import theme from "./theme";

import AppRoutes from "./components/appRoutes";

export const AuthContext = createContext();
const initialState = {
  isAuthenticated: false,
  User: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      sessionStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        User: action.payload,
      };
    case "LOGOUT":
      sessionStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        User: null,
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const checkStoredToken = async () => {
      if (!state.isAuthenticated) {
        let token = sessionStorage.getItem("token");
        token = JSON.parse(token);
        if (token && token !== "undefined" && token !== "" && token !== null) {
          try {
            const response = await client.query({
              query: GET_AUTHENTICATED_USER_PROFILE_TOKEN,
              variables: { token: token },
              fetchPolicy: "network-only",
            });
            if (response.data.authUserProfile.isAuthenticated) {
              dispatch({
                type: "LOGIN",
                payload: response.data.authUserProfile.userProfile,
              });
            }
          } catch (error) {
            dispatch({
              type: "LOGOUT",
            });
            // sessionStorage.clear();
          }
        }
      }
    };
    checkStoredToken();
  }, [state.isAuthenticated]);

  return (
    <>
      <AuthContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
        <HelmetProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <AppRoutes />
          </ThemeProvider>
        </HelmetProvider>
      </AuthContext.Provider>
    </>
  );
};

export default App;
