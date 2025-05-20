import ProductItem from "./ProductItem.jsx";
import { useContext } from "react";
import { AppContext } from "./AppContext.jsx";
import { observer } from "mobx-react-lite";
import { useNavigate, createSearchParams } from "react-router-dom";
import { Grid2, Pagination, PaginationItem, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ProductList = observer(() => {
  const { catalog } = useContext(AppContext);
  const navigate = useNavigate();

  const handleClick = (page) => {
    catalog.page = page;
    const params = {};
    if (catalog.category) params.category = catalog.category;
    if (catalog.brand) params.brand = catalog.brand;
    if (catalog.page > 1) params.page = catalog.page;
    navigate({
      pathname: "/",
      search: "?" + createSearchParams(params),
    });
  };

  return (
    <>
      <Grid2 container mb={2} spacing={2}>
        {catalog.products.length ? (
          catalog.products.map((item) => (
            <ProductItem key={item.id} data={item} />
          ))
        ) : (
          <Typography textAlign="center" width="100%" variant="body2">
            По вашему запросу ничего не найдено
          </Typography>
        )}
      </Grid2>
      {catalog.pages > 1 && (
        <Pagination
          color="primary"
          sx={{ display: "flex", justifyContent: "center" }}
          size="large"
          count={catalog.pages}
          page={catalog.page}
          onChange={(_, page) => handleClick(page)}
          renderItem={(item) => (
            <PaginationItem
              {...item}
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            />
          )}
        />
      )}
    </>
  );
});

export default ProductList;
