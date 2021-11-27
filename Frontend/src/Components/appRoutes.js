import React, { useContext } from "react";
import { useRoutes } from "react-router-dom";

import routes from "../routes";

const AppRoutes = () => {
  const isAuthenticated = false;
  const token = "12345";
  const routing = useRoutes(routes(isAuthenticated, token));
  return <>{routing}</>;
};

export default AppRoutes;
