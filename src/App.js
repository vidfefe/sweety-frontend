import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter.js";
import NavBar from "./components/NavBar.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import { AppContext } from "./components/AppContext.js";
import { check as checkAuth } from "./http/userAPI.js";
import { useState, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import Loader from "./components/Loader.js";
import { fetchBasket } from "./http/basketAPI.js";
import axios from "axios";
import { Container, Divider } from "@mui/material";

const App = observer(() => {
  const { user, basket } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([checkAuth(), fetchBasket()])
      .then(
        axios.spread((userData, basketData) => {
          if (userData) {
            user.login(userData);
          }
          basket.products = basketData.products;
        }),
      )
      .finally(() => setLoading(false));
  }, [basket, user]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container maxWidth="xl" sx={{ marginBottom: 2 }}>
      <BrowserRouter>
        <NavBar />
        <Divider />
        <AppRouter />
      </BrowserRouter>
    </Container>
  );
});

export default App;
