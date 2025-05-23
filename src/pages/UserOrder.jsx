import { useState, useEffect } from "react";
import { userGetOne as getOneOrder } from "../http/orderAPI.js";
import Order from "../components/Order.jsx";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import { Typography } from "@mui/material";
import ErrorPage from "./ErrorPage.jsx";
import { useToast } from "@/hooks/useToast.jsx";

const UserOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(false);
  const showToast = useToast();

  useEffect(() => {
    getOneOrder(id)
      .then((data) => setOrder(data))
      .catch((error) => {
        setError(true);
        showToast(error.response.data.message, "error");
      })
      .finally(() => setFetching(false));
  }, [id]);

  if (fetching) {
    return <Loader />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Ваш заказ
      </Typography>
      <Order data={order} admin={false} />
    </>
  );
};

export default UserOrder;
