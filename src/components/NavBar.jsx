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
} from "@mui/material";
import {
  TuneOutlined,
  ShoppingBasketOutlined,
  ChecklistOutlined,
  LoginOutlined,
  DeliveryDiningOutlined,
} from "@mui/icons-material";

const NavBar = observer(() => {
  const { user, basket } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    user.logout();
    navigate("/login", { replace: true });
  };

  return (
    <AppBar color="transparent" position="static">
      <Toolbar>
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
          <>
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
              <LoginOutlined sx={{ color: "#fff", mr: 2 }} fontSize="large" />
              Выйти
            </Button>
          </>
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
      </Toolbar>
    </AppBar>
  );
});

export default NavBar;
