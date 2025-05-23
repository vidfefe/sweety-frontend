import { useState, useEffect } from "react";
import { userGetAll as getAllOrders } from "../http/orderAPI.js";
import Orders from "../components/Orders.jsx";
import Loader from "../components/Loader.jsx";
import { Typography } from "@mui/material";
import { useToast } from "@/hooks/useToast.jsx";
import ErrorPage from "./ErrorPage.jsx";

const UserOrders = () => {
  const [orders, setOrders] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(false);
  const showToast = useToast();

  useEffect(() => {
    getAllOrders()
      .then((data) => setOrders(data))
      .catch((error) => {
        setError(true);
        showToast(error.response.data.message, "error");
      })
      .finally(() => setFetching(false));
  }, []);

  if (fetching) {
    return <Loader />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      <Typography variant="h4">Ваши заказы</Typography>
      <Orders items={orders} admin={false} />
    </>
  );
};

export default UserOrders;
