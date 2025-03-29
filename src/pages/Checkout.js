import { useState, useContext, useEffect } from "react";
import { AppContext } from "../components/AppContext.js";
import { fetchBasket } from "../http/basketAPI.js";
import { check as checkAuth } from "../http/userAPI.js";
import { Navigate } from "react-router-dom";
import Loader from "../components/Loader.js";
import { Typography, Box, TextField, Button, Container } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";

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
    fetchBasket()
      .then((data) => (basket.products = data.products))
      .finally(() => setFetching(false));
    checkAuth()
      .then((data) => {
        if (data) {
          user.login(data);
        }
      })
      .catch((error) => user.logout());
  }, [basket, user]);

  if (fetching) {
    return <Loader></Loader>;
  }

  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
    setValid({ ...valid, [event.target.name]: isValid(event.target) });
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   setValue({
  //     name: event.target.name.value.trim(),
  //     email: event.target.email.value.trim(),
  //     phone: event.target.phone.value.trim(),
  //     address: event.target.address.value.trim(),
  //   });

  //   setValid({
  //     name: isValid(event.target.name),
  //     email: isValid(event.target.email),
  //     phone: isValid(event.target.phone),
  //     address: isValid(event.target.address),
  //   });

  //   if (valid.name && valid.email && valid.phone && valid.address) {
  //     let comment = event.target.comment.value.trim();
  //     comment = comment ? comment : null;
  //     const body = { ...value, comment };
  //     const create = user.isAuth ? userCreate : guestCreate;
  //     create(body).then((data) => {
  //       setOrder(data);
  //       basket.products = [];
  //     });
  //   }
  // };

  const handlePayment = async () => {
    if (!valid.name || !valid.email || !valid.phone || !valid.address) {
      alert("Заполните все поля корректно");
      return;
    }

    const checkoutData = {
      name: value.name,
      email: value.email,
      phone: value.phone,
      address: value.address,
      comment: value.comment?.trim() || null,
    };
    console.log(checkoutData);

    localStorage.setItem("checkoutData", JSON.stringify(checkoutData));

    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/payment/create-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...checkoutData, products: basket.products }),
        },
      );

      const data = await response.json();

      if (!data.id) {
        alert("Ошибка при создании платежа");
        return;
      }

      const stripe = await loadStripe(
        "pk_test_51QvEacDZZ5hOIJ4z7FoVXC1Tb5Gp4iYWJgHX1FoBRN2ZXkTjFLUN1hEmGbcJrGaT6M79Jo810xJVRMbguyqQ5JaT00GCqsa1Ks",
      );
      const { error } = await stripe.redirectToCheckout({ sessionId: data.id });

      if (error) {
        console.error("Ошибка при редиректе:", error);
      }
    } catch (error) {
      console.error("Ошибка оплаты:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {basket.count === 0 && <Navigate to="/basket" replace />}
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
