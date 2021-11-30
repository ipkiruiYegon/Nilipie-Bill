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
  console.log(action.payload);
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
  const API_URL = process.env.API_URL;

  useEffect(() => {
    const checkStoredToken = async () => {
      if (!state.isAuthenticated) {
        let token = sessionStorage.getItem("token");
        if (token && token !== "undefined" && token !== "" && token !== null) {
          token = JSON.parse(token);
          try {
            const authRequest = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: { token: token },
            };
            console.log(token);
            let resStatus;

            fetch(`${API_URL}/auth`, authRequest)
              .then((res) => {
                resStatus = res.status;
                return res.json();
              })
              .then((data) => {
                console.log(data);
                if (data && resStatus === 200) {
                  sessionStorage.removeItem("token");
                  dispatch({
                    type: "LOGIN",
                    payload: data,
                  });
                  props.setSubmitting(false);
                  navigate("/admin/dashboard", { replace: true });
                } else {
                  console.log("data", data);
                }
              });
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
