import { Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { userCreate, guestCreate } from "../http/orderAPI.js";
import { AppContext } from "../components/AppContext.jsx";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/useToast.jsx";

export default function Success() {
  const { user, basket } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [orderId, setOrderId] = useState(null);
  const showToast = useToast();

  useEffect(() => {
    if (!sessionId || basket.products.length === 0 || orderId) return;

    const createOrder = async () => {
      try {
        const checkoutData = JSON.parse(localStorage.getItem("checkoutData"));
        if (!checkoutData) {
          showToast("Данные оформления заказа не найдены", "error");
          return;
        }
        const create = user.isAuth ? userCreate : guestCreate;
        const order = await create({
          ...checkoutData,
          products: basket.products,
        });

        setOrderId(order.id);

        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/payment/status/${sessionId}?orderId=${order.id}`,
        );
        const data = await response.json();

        if (data.status === "paid") {
          basket.products = [];
          localStorage.removeItem("checkoutData");
        }
      } catch (error) {
        console.error(error);
        showToast("Ошибка при обработке заказа", "error");
      }
    };

    createOrder();
  }, [sessionId, basket, user, orderId]);

  return (
    <Box
      textAlign="center"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={1}
      minHeight="85vh"
    >
      <Typography variant="h4">Оплата прошла успешна</Typography>
      <Typography>Спасибо за покупку!</Typography>
      <Button component={Link} to="/" variant="contained" sx={{ py: "10px" }}>
        На главную
      </Button>
    </Box>
  );
}
