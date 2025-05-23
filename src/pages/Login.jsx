import { AppContext } from "../components/AppContext.jsx";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../http/userAPI.js";
import { observer } from "mobx-react-lite";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { useToast } from "@/hooks/useToast.jsx";

const Login = observer(() => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const showToast = useToast();

  useEffect(() => {
    if (user.isAdmin) navigate("/admin", { replace: true });
    if (user.isAuth) navigate("/", { replace: true });
  }, [user.isAdmin, user.isAuth, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value.trim();
    const password = event.target.password.value.trim();
    const { user: userData, error } = await login(email, password);

    if (error) showToast(error, "error");

    if (userData) {
      user.login(userData);
      if (user.isAdmin) navigate("/admin");
      if (user.isAuth) navigate("/");
      showToast("Вы успешно вошли в аккаунт", "success");
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper elevation={0} sx={{ maxWidth: "100%", width: 400, p: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Авторизация
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            name="email"
            type="email"
            label="Введите ваш email..."
            fullWidth
            required
          />
          <TextField
            name="password"
            type="password"
            label="Введите ваш пароль..."
            fullWidth
            required
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ py: "16px" }}
          >
            Войти
          </Button>
        </Box>
        <Box textAlign="center" mt={2}>
          <Typography variant="body2" color="textSecondary">
            Нет аккаунта? <Link to="/signup">Зарегистрируйтесь</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
});

export default Login;
