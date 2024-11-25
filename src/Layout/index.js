import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;
const collapsedWidth = 70;

const Layout = ({ children }) => {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Box sx={{ display: "flex"}}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          background: "#f7a072",
          width: `calc(100% - ${open ? drawerWidth : collapsedWidth}px)`,
          ml: `${open ? drawerWidth : collapsedWidth}px`,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            E-Learning Platform
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: open ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : collapsedWidth,
            boxSizing: "border-box",
            transition: "width 0.3s",
            overflowX: "hidden",
            background: "#eff6e0"
          },
        }}
        anchor="left"
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem
              button
              component={Link}
              to="/dashboard"
              selected={isActive("/dashboard")}
              sx={{
                justifyContent: open ? "flex-start" : "center",
                paddingLeft: open ? "16px" : "0px",
                transition: "justify-content 0.3s",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : "auto",
                  justifyContent: "center",
                }}
              >
                <DashboardIcon
                  color={isActive("/dashboard") ? "primary" : "inherit"}
                />
              </ListItemIcon>
              {open && <ListItemText primary="Dashboard" />}
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/courses"
              selected={isActive("/courses")}
              sx={{
                justifyContent: open ? "flex-start" : "center",
                paddingLeft: open ? "16px" : "0px",
                transition: "justify-content 0.3s",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : "auto",
                  justifyContent: "center",
                }}
              >
                <SchoolIcon
                  color={isActive("/courses") ? "primary" : "inherit"}
                />
              </ListItemIcon>
              {open && <ListItemText primary="Courses" />}
            </ListItem>
            <ListItem
              button
              component={Link}
              to="/cart"
              selected={isActive("/cart")}
              sx={{
                justifyContent: open ? "flex-start" : "center",
                paddingLeft: open ? "16px" : "0px",
                transition: "justify-content 0.3s",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : "auto",
                  justifyContent: "center",
                }}
              >
                <ShoppingCartIcon
                  color={isActive("/cart") ? "primary" : "inherit"}
                />
              </ListItemIcon>
              {open && <ListItemText primary="Cart" />}
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          // ml: `${open ? drawerWidth : collapsedWidth}px`,
          transition: "margin 0.3s",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
