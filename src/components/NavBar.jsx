import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "./AppContext.jsx";
import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { logout } from "../http/userAPI.js";
import {
  AppBar,
  Toolbar,
  Tooltip,
  Box,
  IconButton,
  Button,
  Badge,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  TuneOutlined,
  ShoppingBasketOutlined,
  ChecklistOutlined,
  LoginOutlined,
  DeliveryDiningOutlined,
  Menu,
} from "@mui/icons-material";
import { useState } from "react";

const NavBar = observer(() => {
  const { user, basket } = useContext(AppContext);
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    user.logout();
    navigate("/login", { replace: true });
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const drawerItems = [
    {
      text: "Доставка",
      icon: <DeliveryDiningOutlined />,
      link: "/delivery",
    },
    ...(user.isAdmin
      ? [
          {
            text: "Панель",
            icon: <TuneOutlined />,
            link: "/admin",
          },
        ]
      : []),
    {
      text: `Корзина (${basket.count})`,
      icon: <ShoppingBasketOutlined />,
      link: "/basket",
    },
    ...(user.isAuth
      ? [
          {
            text: "Мои заказы",
            icon: <ChecklistOutlined />,
            link: "/user/orders",
          },
          {
            text: "Выйти",
            icon: <LoginOutlined />,
            action: handleLogout,
          },
        ]
      : [
          {
            text: "Войти",
            icon: <LoginOutlined />,
            link: "/login",
          },
        ]),
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <List>
        {drawerItems.map(({ text, icon, link, action }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              component={link ? NavLink : "button"}
              to={link}
              onClick={action}
              sx={{ textAlign: "left" }}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar component="nav" color="transparent" position="static">
        <Toolbar disableGutters>
          <Tooltip title="Главная">
            <NavLink to="/">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={1}
              >
                <img src="/candy.svg" alt="Logo" height={50} />
                <Typography
                  variant="h6"
                  fontWeight="800"
                  sx={{ color: "#9c27b0" }}
                >
                  SWEETY
                </Typography>
              </Box>
            </NavLink>
          </Tooltip>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton
              className="burger-button"
              onClick={() => setMobileOpen(true)}
            >
              <Menu fontSize="large" />
            </IconButton>
          </Box>

          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <Tooltip title="Доставка">
              <IconButton component={NavLink} to="/delivery">
                <DeliveryDiningOutlined fontSize="large" />
              </IconButton>
            </Tooltip>
            {user.isAdmin && (
              <Tooltip title="Панель управления">
                <IconButton component={NavLink} to="/admin">
                  <TuneOutlined fontSize="large" />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Корзина">
              <IconButton component={NavLink} to="/basket">
                <Badge badgeContent={basket.count} color="primary">
                  <ShoppingBasketOutlined fontSize="large" />
                </Badge>
              </IconButton>
            </Tooltip>
            {user.isAuth ? (
              <Box>
                <Tooltip title="Заказы">
                  <IconButton component={NavLink} to="/user/orders">
                    <ChecklistOutlined fontSize="large" />
                  </IconButton>
                </Tooltip>
                <Button
                  className="logout-button"
                  variant="contained"
                  onClick={handleLogout}
                  sx={{ marginLeft: 1 }}
                >
                  <LoginOutlined
                    sx={{ color: "#fff", mr: 2 }}
                    fontSize="large"
                  />
                  Выйти
                </Button>
              </Box>
            ) : (
              <Button
                className="login-button"
                variant="contained"
                component={NavLink}
                to="/login"
                sx={{ marginLeft: 1 }}
              >
                <LoginOutlined sx={{ color: "#fff", mr: 2 }} fontSize="large" />
                <Typography>Войти</Typography>
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          variant=""
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          anchor="right"
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 250,
              paddingTop: 4,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
});

export default NavBar;
