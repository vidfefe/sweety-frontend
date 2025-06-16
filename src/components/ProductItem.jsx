import { Grid2, Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ data }) => {
  const navigate = useNavigate();
  return (
    <Grid2
      size={{ xs: 12, sm: 6, lg: 3 }}
      onClick={() => navigate(`/product/${data.id}`)}
    >
      <Card sx={{ height: 300 }}>
        {data.image ? (
          <CardMedia
            component="img"
            alt={data.name}
            image={data.image}
            sx={{ height: 200, objectFit: "contain" }}
          />
        ) : (
          <CardMedia
            component="img"
            alt="placeholder"
            sx={{ height: 200, objectFit: "contain" }}
            image="https://placehold.co/300x200/purple/white"
          />
        )}
        <CardContent sx={{ overflow: "hidden", flexGrow: 1 }}>
          <Typography variant="h6">{data.name}</Typography>
          <Typography variant="body2">
            {data.category.name} {data.brand.name}
          </Typography>
        </CardContent>
      </Card>
    </Grid2>
  );
};

export default ProductItem;
