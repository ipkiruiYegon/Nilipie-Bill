import React, { useContext } from "react";
import { useRoutes } from "react-router-dom";
import { AuthContext } from "../App";

import routes from "../routes";

const AppRoutes = () => {
  const { state } = useContext(AuthContext);
  let token = "";
  if (state.User && state.User.token) {
    token = state.User.token;
  }
  const isAuthenticated = state.isAuthenticated ? state.isAuthenticated : false;
  const routing = useRoutes(routes(isAuthenticated, token));
  return <>{routing}</>;
};

export default AppRoutes;
