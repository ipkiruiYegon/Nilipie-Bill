import React from "react";
import { Navigate } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import MainLayout from "./components/MainLayout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Checkout from "./pages/CheckOut";

const routes = (isAuthenticated, token) => [
  {
    path: "admin",
    element:
      isAuthenticated && token ? <DashboardLayout /> : <Navigate to="/home" />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },

  {
    path: "/",
    element: !isAuthenticated ? (
      <MainLayout />
    ) : (
      <Navigate to="/admin/dashboard" />
    ),
    children: [
      { path: "home", element: <LandingPage /> },
      { path: "login", element: <Login /> },
      { path: "checkout", element: <Checkout /> },
      { path: "404", element: <NotFound /> },
      { path: "/", element: <Navigate to="/home" /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
