import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Link from "@mui/material/Link";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Logo from "./Logo";
import { color } from "@mui/system";

const MainNavbar = (props) => (
  <AppBar elevation={0} {...props}>
    <Toolbar sx={{ flexWrap: "wrap" }}>
      <RouterLink to="/">
        <Logo />
      </RouterLink>

      <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
        OKOA MGONJWA H-BILL FOUNDATION
      </Typography>
      <nav>
        <Button
          component={RouterLink}
          to="/home"
          variant="text"
          color="inherit"
        >
          Home
        </Button>
        <Button
          component={RouterLink}
          to="/about"
          variant="text"
          color="inherit"
        >
          About
        </Button>
        <Button
          component={RouterLink}
          to="/contact"
          variant="text"
          color="inherit"
        >
          Contact
        </Button>
        <Button
          variant="text"
          color="inherit"
          href="/checkout"
          sx={{ my: 1, mx: 1.5 }}
        >
          Donate
        </Button>
      </nav>
      <Button
        component={RouterLink}
        to="/login"
        variant="outlined"
        color="inherit"
        sx={{ my: 1, mx: 1.5, color: "whitesmoke" }}
      >
        Admin
      </Button>
    </Toolbar>
  </AppBar>
);

export default MainNavbar;
