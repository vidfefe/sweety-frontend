import { useContext, useState } from "react";
import { AppContext } from "./AppContext.js";
import { increment, decrement, remove } from "../http/basketAPI.js";
import { Link, useNavigate } from "react-router-dom";
import BasketItem from "./BasketItem.js";
import { observer } from "mobx-react-lite";
import Loader from "./Loader.js";

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

const BasketList = observer(() => {
  const { basket } = useContext(AppContext);
  const [fetching, setFetching] = useState(false);
  let shipping = basket.sum * 0.2;

  const navigate = useNavigate();

  const handleIncrement = (id) => {
    setFetching(true);
    increment(id)
      .then((data) => (basket.products = data.products))
      .finally(() => setFetching(false));
  };

  const handleDecrement = (id) => {
    setFetching(true);
    decrement(id)
      .then((data) => (basket.products = data.products))
      .finally(() => setFetching(false));
  };

  const handleRemove = (id) => {
    setFetching(true);
    remove(id)
      .then((data) => (basket.products = data.products))
      .finally(() => setFetching(false));
  };

  if (fetching) {
    return <Loader />;
  }

  return (
    <>
      {basket.count ? (
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Table size="small">
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
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
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
