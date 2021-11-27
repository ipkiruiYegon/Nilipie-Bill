import React, { useContext, useEffect } from "react";
import LazyLoad from "react-lazyload";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
} from "@mui/material";
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Clipboard as ReportIcon,
  Settings as SettingsIcon,
  Briefcase as CashierIcon,
  ShoppingBag as ShoppingBagIcon,
  BookOpen as AccountsIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  CreditCard as LoansIcon,
  DollarSign as TellerIcon,
  Clock as TaskIcon,
  Search as ReconsIcon,
} from "react-feather";
import NavItem from "../NavItem";
import getInitials from "../utils/getInitials";

const items = [
  {
    href: "/app/dashboard",
    icon: BarChartIcon,
    title: "Dashboard",
  },

  {
    href: "/app/donation",
    icon: TellerIcon,
    title: "Donations",
  },
  {
    href: "/app/reconcilition",
    icon: ReconsIcon,
    title: "Reconcilitions",
  },

  {
    href: "/app/users",
    icon: UserPlusIcon,
    title: "Users",
  },
  {
    href: "/app/settings",
    icon: SettingsIcon,
    title: "Settings",
  },

  {
    href: "/app/reports",
    icon: ReportIcon,
    title: "Reports",
  },
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          p: 2,
        }}
      >
        <LazyLoad>
          <Avatar
            component={RouterLink}
            sx={{
              cursor: "pointer",
              width: 64,
              height: 64,
            }}
            to="/app/account"
          >
            {getInitials(`yegon geoffrey`)}
          </Avatar>
        </LazyLoad>
        <Typography color="textPrimary" variant="h5">
          yegon
        </Typography>
        <Typography color="textSecondary" variant="body2">
          Admin
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256,
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: "calc(100% - 64px)",
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default DashboardSidebar;
