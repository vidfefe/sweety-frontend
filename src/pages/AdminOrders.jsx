import { useState, useEffect } from "react";
import { adminGetAll as getAllOrders } from "../http/orderAPI.js";
import Orders from "../components/Orders.jsx";
import CreateOrder from "../components/CreateOrder.jsx";

const AdminOrders = () => {
  const [orders, setOrders] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    getAllOrders()
      .then((data) => setOrders(data))
      .finally(() => setFetching(false));
  }, []);

  if (fetching) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      <h1>Все заказы</h1>
      <Button onClick={() => setShow(true)}>Создать заказ</Button>
      <CreateOrder show={show} setShow={setShow} />
      <Orders items={orders} admin={true} />
    </Container>
  );
};

export default AdminOrders;
