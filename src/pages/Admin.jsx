import { useContext } from "react";
import { AppContext } from "../components/AppContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../http/userAPI.js";

import { LoginOutlined } from "@mui/icons-material";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";

const Admin = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    user.logout();
    navigate("/login", { replace: true });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Панель управления
      </Typography>
      <Typography variant="body1" gutterBottom>
        Это панель управления магазином для администратора
      </Typography>

      <List>
        <ListItem component={Link} to="/admin/categories">
          <ListItemText primary="Категории товаров" />
        </ListItem>
        <ListItem component={Link} to="/admin/brands">
          <ListItemText primary="Бренды товаров" />
        </ListItem>
        <ListItem component={Link} to="/admin/products">
          <ListItemText primary="Товары" />
        </ListItem>
        {/* <ListItem component={Link} to="/admin/orders">
          <ListItemText primary="Заказы клиентов" />
        </ListItem> */}
      </List>

      <Button
        className="logout-button"
        variant="contained"
        onClick={handleLogout}
        sx={{ marginLeft: 1 }}
      >
        <LoginOutlined sx={{ color: "#fff", mr: 2 }} fontSize="large" />
        Выйти
      </Button>
    </Box>
  );
};

export default Admin;
