import React from "react";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import InputIcon from "@mui/icons-material/Input";
import Logo from "./Logo";
import { orange } from "@mui/material/colors";

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications] = useState([]);

  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <RouterLink to="/">
          <Logo />
        </RouterLink>

        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          OKOA MGONJWA H-BILL FOUNDATION
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden lgDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Button
            component={RouterLink}
            to="/login"
            variant="outlined"
            color="inherit"
            sx={{ my: 1, mx: 1.5, color: "whitesmoke" }}
          >
            Logout
          </Button>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func,
};

export default DashboardNavbar;
