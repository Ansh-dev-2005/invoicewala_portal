import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { MenuItems } from "./constants/constant";
import assets from "./assets";
import {
  AccountCircle,
  BarChart,
  Business,
  Dashboard,
  Expand,
  ExpandLess,
  ExpandMore,
  Logout,
  MiscellaneousServices,
  Notifications,
  PointOfSale,
  Settings,
  ShoppingCartCheckout,
  VerifiedUser,
} from "@mui/icons-material";
import AppSettingsAltIcon from "@mui/icons-material/AppSettingsAlt";
import { AccountMenu } from "./Components";
import { Collapse, createTheme, Menu, MenuItem } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useAuth } from "./AuthContext";
import { getMenuItems } from "./action/user";
import Breadcrumbs from "./Components/BreadCrumbs";
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const defaultTheme = createTheme();

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Base(props) {
  const theme = useTheme();
  const [menu , setMenu] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const [submenuOpen, setSubmenuOpen] = React.useState({});
  const Navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const {logout} = useAuth();

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    logout();
    handleMenuClose();
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const getIcon = (iconName) => {
    switch (iconName) {
      case "Dashboard":
        return <Dashboard />;
      case "PointOfSale":
        return <PointOfSale />;
      case "ShoppingCartCheckout":
        return <ShoppingCartCheckout />;
      case "BarChart":
        return <BarChart />;
      case "MiscellaneousServices":
        return <MiscellaneousServices />;
      case "AppSettingsAltIcon":
        return <AppSettingsAltIcon />;
      default:
        return <Dashboard />;
    }
  };
  const handleSubmenuToggle = (title) => {
    setSubmenuOpen((prevState) => ({
      ...prevState,
      [title]: !prevState[title],
    }));
  };
  const handleMenuItemClick = (url) => {
    Navigate(url);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await getMenuItems();
      setMenu(response);
    }
    fetchData();

  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            InvoiceWala
          </Typography>
          <div style={{ flexGrow: 1 }}></div>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            sx={{ mr: 2 }}
          >
            <Notifications
              // increase the size of icon
              sx={{ fontSize: 40 }}
              // add space between icon
            />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="account menu"
            edge="end"
            sx={{ mr: 2 }}
            onClick={handleMenuOpen}
          >
            <AccountCircle sx={{ fontSize: 40 }} />
          </IconButton>
          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
            MenuListProps={{ "aria-labelledby": "account-menu-button" }}
          >
            <MenuItem onClick={handleMenuClose}>
              <Business sx={{ marginRight: 1 }} />
              Organization Profile
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Settings sx={{ marginRight: 1 }} />
              Setting
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Logout sx={{ marginRight: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
        {/* add profile option in right side */}
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          {/* add comapny logo */}
          <img src={assets.logo} alt="logo" />

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menu.map((item, index) => (
            <React.Fragment key={item.title}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    if (item.title !== "Dashboard") {
                      handleSubmenuToggle(item.title);
                    } else {
                      handleMenuItemClick(item.url);
                    }
                  }}
                >
                  <ListItemIcon>{getIcon(item.icon)}</ListItemIcon>
                  <ListItemText primary={item.title} />
                  {item.title !== "Dashboard" &&
                    (submenuOpen[item.title] ? <ExpandLess /> : <ExpandMore />)}
                </ListItemButton>
              </ListItem>
              {item.title !== "Dashboard" && (
                <Collapse
                  in={submenuOpen[item.title]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.sub_menu && (
                      <Collapse
                        in={submenuOpen[item.title]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {item.sub_menu.map((subItem, subIndex) => (
                            <ListItem
                              disablePadding
                              key={subIndex}
                              sx={{ pl: 4 }}
                            >
                              <ListItemButton
                                onClick={() => handleMenuItemClick(subItem.url)}
                              >
                                <ListItemText primary={subItem.title} />
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </Collapse>
                    )}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <ThemeProvider theme={defaultTheme}>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />

            <Box
              component="main"
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.grey[900],
                flexGrow: 1,
                height: "100vh",
                overflow: "auto",
              }}
            >
              <Breadcrumbs />
              {props.children}
            </Box>
          </Box>
        </ThemeProvider>
      </Main>
    </Box>
  );
}
