import { useState, useEffect } from "react";
import { adminGetAll as getAllOrders } from "../http/orderAPI.js";
import Orders from "../components/Orders.jsx";
import CreateOrder from "../components/CreateOrder.jsx";
import { Button, Typography } from "@mui/material";
import Loader from "../components/Loader.jsx";
import { AddOutlined } from "@mui/icons-material";
import { useToast } from "@/hooks/useToast.jsx";

const AdminOrders = () => {
  const [orders, setOrders] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [show, setShow] = useState(false);
  const showToast = useToast();

  useEffect(() => {
    getAllOrders()
      .then((data) => setOrders(data))
      .catch((error) => showToast(error.response.data.message, "error"))
      .finally(() => setFetching(false));
  }, []);

  if (fetching) {
    return <Loader />;
  }

  return (
    <>
      <Typography variant="h4">Все заказы</Typography>
      <Button
        sx={{ py: "10px" }}
        startIcon={<AddOutlined />}
        variant="contained"
        onClick={() => setShow(true)}
      >
        Создать заказ
      </Button>
      <CreateOrder show={show} setShow={setShow} />
      <Orders items={orders} admin={true} />
    </>
  );
};

export default AdminOrders;
