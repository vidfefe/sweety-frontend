import { useEffect, useState, useContext } from "react";
import {
  fetchOneProduct,
  fetchProdRating,
  rateProduct,
} from "../http/catalogAPI.js";
import { useParams } from "react-router-dom";
import { append } from "../http/basketAPI.js";
import { AppContext } from "../components/AppContext.js";
import Loader from "../components/Loader.js";
import Grid from "@mui/material/Grid2";
import {
  Typography,
  Button,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  Rating,
  TableRow,
} from "@mui/material";

const Product = () => {
  const { id } = useParams();
  const { basket } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [userRating, setUserRating] = useState(null);

  useEffect(() => {
    fetchOneProduct(id).then((data) => setProduct(data));
    fetchProdRating(id).then((data) => {
      setUserRating(data.userRating);
    });
  }, [id]);

  const handleClick = (productId) => {
    append(productId).then((data) => {
      const updatedProducts = data.products.map((product) => {
        return {
          ...product,
          image: product.image,
        };
      });

      basket.products = updatedProducts;
    });
  };

  const handleRatingChange = (newValue) => {
    rateProduct(id, newValue)
      .then((updatedProduct) => {
        setUserRating(updatedProduct.rating);
        setProduct((prev) => ({
          ...prev,
          rating: updatedProduct.averageRating,
        }));
      })
      .catch(() => {
        alert("Ошибка при сохранении рейтинга");
      });
  };

  if (!product) {
    return <Loader />;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
        container
        spacing={2}
      >
        <Grid>
          {product.image ? (
            <img
              style={{
                objectFit: "contain",
                maxHeight: 300,
                maxWidth: "100%",
              }}
              src={process.env.REACT_APP_IMG_URL + product.image}
              alt={product.name}
            />
          ) : (
            <img
              width={300}
              src="https://placehold.co/300x300"
              alt="Placeholder"
            />
          )}
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 8 }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>

            <Grid container spacing={2}>
              <Grid>
                <Typography variant="h5">{product.price} BYN</Typography>
              </Grid>
              <Grid display="flex" alignItems="center" justifyContent="center">
                <Typography variant="body2" ml={2}>
                  Средний рейтинг:{" "}
                  {product.rating ? product.rating : "Нет оценок"}
                </Typography>
                <Typography variant="body2" ml={2}>
                  Вы поставили:
                </Typography>
                <Rating
                  name="user-rating"
                  value={Number(userRating) || 0}
                  onChange={(event, newValue) => handleRatingChange(newValue)}
                  size="large"
                />
              </Grid>
            </Grid>
          </Box>

          <Button
            variant="contained"
            color="primary"
            sx={{
              py: "16px",
            }}
            onClick={() => handleClick(product.id)}
          >
            Добавить в корзину
          </Button>

          <Box mt={2}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Бренд: {product.brand.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Категория: {product.category.name}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {!!product.props.length && (
        <Grid container spacing={3} mt={5}>
          <Grid size={{ xs: 12, sm: 7 }}>
            <Typography variant="h5">Характеристики</Typography>
            <Table size="small">
              <TableBody>
                {product.props.map((item) => {
                  if (item.name !== "Состав") {
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="text-muted">
                          {item.name}
                        </TableCell>
                        <TableCell>{item.value}</TableCell>
                      </TableRow>
                    );
                  }
                  return null;
                })}
              </TableBody>
            </Table>
          </Grid>

          <Grid size={{ xs: 12, sm: 5 }}>
            <Typography variant="h5" gutterBottom>
              Состав
            </Typography>
            {product.props.map((item) => {
              if (item.name === "Состав") {
                return (
                  <Paper key={item.id} elevation={0}>
                    <Typography color="textSecondary">{item.value}</Typography>
                  </Paper>
                );
              }
              return null;
            })}
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Product;
