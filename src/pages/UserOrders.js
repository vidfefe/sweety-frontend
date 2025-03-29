import { useState, useEffect } from "react";
import { userGetAll as getAllOrders } from "../http/orderAPI.js";
import Orders from "../components/Orders.js";
import Loader from "../components/Loader.js";
import { Typography } from "@mui/material";

const UserOrders = () => {
  const [orders, setOrders] = useState(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    getAllOrders()
      .then((data) => setOrders(data))
      .finally(() => setFetching(false));
  }, []);

  if (fetching) {
    return <Loader />;
  }

  return (
    <>
      <Typography variant="h4">Ваши заказы</Typography>
      <Orders items={orders} admin={false} />
    </>
  );
};

export default UserOrders;
