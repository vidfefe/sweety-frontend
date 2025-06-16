import { useContext, useState } from "react";
import { AppContext } from "./AppContext.jsx";
import { increment, decrement, remove } from "../http/basketAPI.js";
import { Link, useNavigate } from "react-router-dom";
import BasketItem from "./BasketItem.jsx";
import { observer } from "mobx-react-lite";
import Loader from "./Loader.jsx";

import Grid from "@mui/material/Grid2";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useToast } from "@/hooks/useToast.jsx";

const BasketList = observer(() => {
  const { basket } = useContext(AppContext);
  const [fetching, setFetching] = useState(false);
  let shipping = basket.sum * 0.2;
  const showToast = useToast();

  const navigate = useNavigate();

  const handleIncrement = (id) => {
    setFetching(true);
    increment(id)
      .then((data) => (basket.products = data.products))
      .catch((error) => {
        console.error(error);
        showToast("Ошибка при добавлении товара", "error");
      })
      .finally(() => setFetching(false));
  };

  const handleDecrement = (id) => {
    setFetching(true);
    decrement(id)
      .then((data) => (basket.products = data.products))
      .catch((error) => {
        console.error(error);
        showToast("Ошибка при добавлении товара", "error");
      })
      .finally(() => setFetching(false));
  };

  const handleRemove = (id) => {
    setFetching(true);
    remove(id)
      .then((data) => (basket.products = data.products))
      .catch((error) => {
        console.error(error);
        showToast("Ошибка при добавлении товара", "error");
      })
      .finally(() => setFetching(false));
  };

  if (fetching) {
    return <Loader />;
  }

  return (
    <>
      {basket.count ? (
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8, lg: 7 }}>
            <Box sx={{ overflowX: "auto", width: "100%" }}>
              <Table size="small" sx={{ minWidth: 600 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Изображение</TableCell>
                    <TableCell>Наименование</TableCell>
                    <TableCell>Цена</TableCell>
                    <TableCell>Количество</TableCell>
                    <TableCell>Сумма</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {basket.products.map((item) => (
                    <BasketItem
                      key={item.id}
                      increment={handleIncrement}
                      decrement={handleDecrement}
                      remove={handleRemove}
                      {...item}
                    />
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4, lg: 5 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={2}>Итого по корзине</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Доставка</TableCell>
                  <TableCell>{shipping.toFixed(2)} BYN</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Итого</TableCell>
                  <TableCell>
                    <Typography>
                      {(basket.sum + shipping).toFixed(2)} BYN
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => navigate("/checkout")}
              sx={{ mt: 2, py: "16px" }}
            >
              Оформить заказ
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h6" gutterBottom>
            Ваша корзина пуста
          </Typography>
          <Button
            sx={{ py: "10px" }}
            className="basket-empty"
            variant="contained"
            color="primary"
            component={Link}
            to="/"
          >
            <Typography>Совершить покупку</Typography>
          </Button>
        </Box>
      )}
    </>
  );
});

export default BasketList;
