import { useState, useContext, useEffect } from "react";
import { AppContext } from "../components/AppContext.jsx";
import { fetchBasket } from "@/http/basketAPI.js";
import { check as checkAuth } from "../http/userAPI.js";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import { Typography, Box, TextField, Button, Container } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import { useToast } from "@/hooks/useToast.jsx";

const isValid = (input) => {
  let pattern;
  switch (input.name) {
    case "name":
      pattern = /^[-а-я]{2,}( [-а-я]{2,}){1,2}$/i;
      return pattern.test(input.value.trim());
    case "email":
      pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/i;
      return pattern.test(input.value.trim());
    case "phone":
      pattern = /^\+375\s?(29|33|44|25)\s?\d{3}(-|\s)?\d{2}(-|\s)?\d{2}$/i;
      return pattern.test(input.value.trim());
    case "address":
      return input.value.trim() !== "";
    default:
      return "";
  }
};

const Checkout = () => {
  const { user, basket } = useContext(AppContext);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const showToast = useToast();

  const [value, setValue] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [valid, setValid] = useState({
    name: null,
    email: null,
    phone: null,
    address: null,
  });

  useEffect(() => {
    checkAuth()
      .then((data) => {
        if (data) {
          user.login(data);
        }
      })
      .catch(() => showToast("Что-то пошло не так...", "error"));

    fetchBasket()
      .then((data) => {
        if (Array.isArray(data?.products && data.products.length > 0)) {
          basket.products = data.products;
        }
      })
      .catch(() => showToast("Ошибка получения корзины", "error"))
      .finally(() => setFetching(false));
  }, [basket, user]);

  if (fetching) {
    return <Loader></Loader>;
  }

  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
    setValid({ ...valid, [event.target.name]: isValid(event.target) });
  };

  const handlePayment = async () => {
    if (!valid.name || !valid.email || !valid.phone || !valid.address) {
      showToast("Заполните все поля корректно", "error");
      return;
    }

    const checkoutData = {
      name: value.name,
      email: value.email,
      phone: value.phone,
      address: value.address,
      comment: value.comment?.trim() || null,
    };

    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));

    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/payment/create-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...checkoutData, products: basket.products }),
        },
      );

      const data = await response.json();

      if (!data.id) {
        showToast("Ошибка при создании платежа", "error");
        return;
      }

      const stripe = await loadStripe(
        import.meta.env.VITE_APP_STRIPE_PUBLISHABLE_KEY,
      );
      const { error } = await stripe.redirectToCheckout({ sessionId: data.id });

      if (error) {
        showToast("Ошибка при создании платежа", "error");
      }
    } catch (error) {
      showToast("Ошибка оплаты заказа", "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!fetching && basket.count === 0) {
    return <Navigate to="/basket" replace />;
  }

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Оформление заказа
      </Typography>
      <Box component="form" noValidate sx={{ maxWidth: 500 }}>
        <TextField
          fullWidth
          name="name"
          value={value.name}
          onChange={handleChange}
          error={valid.name === false}
          helperText={valid.name === false ? "Введите корректное имя" : ""}
          label="Имя и фамилия"
          margin="normal"
        />
        <TextField
          fullWidth
          name="email"
          value={value.email}
          onChange={handleChange}
          error={valid.email === false}
          helperText={valid.email === false ? "Введите корректный email" : ""}
          label="Email"
          margin="normal"
        />
        <TextField
          fullWidth
          name="phone"
          value={value.phone}
          onChange={handleChange}
          error={valid.phone === false}
          helperText={valid.phone === false ? "Введите корректный номер" : ""}
          label="Телефон"
          margin="normal"
        />
        <TextField
          fullWidth
          name="address"
          value={value.address}
          onChange={handleChange}
          error={valid.address === false}
          helperText={valid.address === false ? "Введите адрес" : ""}
          label="Адрес доставки"
          margin="normal"
        />
        <TextField
          fullWidth
          name="comment"
          value={value.comment}
          onChange={handleChange}
          label="Комментарий к заказу"
          margin="normal"
        />
        <Button
          onClick={handlePayment}
          variant="contained"
          sx={{ mt: 2, width: "100%", py: "16px" }}
          disabled={loading}
        >
          {loading ? "Перенаправление..." : "Оплатить"}
        </Button>
      </Box>
    </Container>
  );
};

export default Checkout;
