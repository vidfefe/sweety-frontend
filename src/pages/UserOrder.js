import { useState, useEffect } from "react";
import { userGetOne as getOneOrder } from "../http/orderAPI.js";
import Order from "../components/Order.js";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader.js";
import { Typography } from "@mui/material";

const UserOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getOneOrder(id)
      .then((data) => setOrder(data))
      .catch((error) => setError(error.response.data.message))
      .finally(() => setFetching(false));
  }, [id]);

  if (fetching) {
    return <Loader />;
  }

  if (error) {
    return <p>{error}</p>;
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
