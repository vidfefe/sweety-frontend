import { useEffect, useState, useContext } from "react";
import {
  fetchOneProduct,
  fetchProdRating,
  rateProduct,
} from "../http/catalogAPI.js";
import { useParams } from "react-router-dom";
import { append } from "../http/basketAPI.js";
import { AppContext } from "../components/AppContext.jsx";
import Loader from "../components/Loader.jsx";
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
import { useToast } from "@/hooks/useToast.jsx";

const Product = () => {
  const { id } = useParams();
  const { basket } = useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [userRating, setUserRating] = useState(null);
  const showToast = useToast();

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
    showToast("Товар добавлен в корзину", "success");
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
        showToast("Ошибка при сохранении рейтинга", "error");
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
        <Grid
          sx={{
            mx: { xs: "auto", md: 0 },
          }}
        >
          {product.image ? (
            <img
              style={{
                objectFit: "contain",
                maxHeight: 300,
                maxWidth: "100%",
              }}
              src={product.image}
              alt={product.name}
            />
          ) : (
            <img
              width={300}
              src="https://placehold.co/300x300/purple/white"
              alt="Placeholder"
            />
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: { xs: "flex-start", md: "center" },
                gap: { xs: 1, md: 2 },
              }}
            >
              <Typography variant="h5">{product.price} BYN</Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <Typography variant="body2">
                  Средний рейтинг:{" "}
                  {product.rating
                    ? Number(product.rating).toFixed(1)
                    : "Нет оценок"}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                  }}
                >
                  <Typography variant="body2">Вы поставили:</Typography>
                  <Rating
                    name="user-rating"
                    value={userRating || 0}
                    onChange={(_, newValue) => handleRatingChange(newValue)}
                    size="large"
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          <Button
            variant="contained"
            color="primary"
            sx={{
              py: "16px",
              my: 1,
            }}
            onClick={() => handleClick(product.id)}
          >
            Добавить в корзину
          </Button>

          <Box>
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
          <Grid size={{ xs: 12, md: 7 }}>
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

          <Grid size={{ xs: 12, md: 5 }}>
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
