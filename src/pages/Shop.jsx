import { Grid2 } from "@mui/material";
import ProductList from "../components/ProductList.jsx";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../components/AppContext.jsx";
import {
  fetchCategories,
  fetchBrands,
  fetchAllProducts,
} from "../http/catalogAPI.js";
import { observer } from "mobx-react-lite";
import { useLocation, useSearchParams } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import FilterAccordion from "../components/FilterAccordion.jsx";

const getSearchParams = (searchParams) => {
  let category = searchParams.get("category");
  if (category && /[1-9][0-9]*/.test(category)) {
    category = parseInt(category);
  }
  let brand = searchParams.get("brand");
  if (brand && /[1-9][0-9]*/.test(brand)) {
    brand = parseInt(brand);
  }
  let page = searchParams.get("page");
  if (page && /[1-9][0-9]*/.test(page)) {
    page = parseInt(page);
  }
  return { category, brand, page };
};

const Shop = observer(() => {
  const { catalog } = useContext(AppContext);

  const [categoriesFetching, setCategoriesFetching] = useState(true);
  const [brandsFetching, setBrandsFetching] = useState(true);
  const [productsFetching, setProductsFetching] = useState(true);

  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchCategories()
      .then((data) => (catalog.categories = data))
      .finally(() => setCategoriesFetching(false));

    fetchBrands()
      .then((data) => (catalog.brands = data))
      .finally(() => setBrandsFetching(false));

    const { category, brand, page } = getSearchParams(searchParams);
    catalog.category = category;
    catalog.brand = brand;
    catalog.page = page ?? 1;

    fetchAllProducts(
      catalog.category,
      catalog.brand,
      catalog.page,
      catalog.limit,
    )
      .then((data) => {
        catalog.products = data.rows;
        catalog.count = data.count;
      })
      .finally(() => setProductsFetching(false));
  }, [catalog, searchParams]);

  useEffect(() => {
    const { category, brand, page } = getSearchParams(searchParams);

    if (category || brand || page) {
      if (category !== catalog.category) {
        catalog.category = category;
      }
      if (brand !== catalog.brand) {
        catalog.brand = brand;
      }
      if (page !== catalog.page) {
        catalog.page = page ?? 1;
      }
    } else {
      catalog.category = null;
      catalog.brand = null;
      catalog.page = 1;
    }
  }, [location.search, catalog, searchParams]);

  useEffect(() => {
    setProductsFetching(true);
    fetchAllProducts(
      catalog.category,
      catalog.brand,
      catalog.page,
      catalog.limit,
    )
      .then((data) => {
        catalog.products = data.rows;
        catalog.count = data.count;
      })
      .finally(() => setProductsFetching(false));
  }, [catalog.category, catalog.brand, catalog.page, catalog]);

  return (
    <>
      {categoriesFetching || brandsFetching || productsFetching ? (
        <Loader></Loader>
      ) : (
        <Grid2 container mt={2} spacing={2}>
          <Grid2 size={{ md: 3 }}>
            <FilterAccordion />
          </Grid2>
          <Grid2 size={{ md: 9 }}>
            <ProductList />
          </Grid2>
        </Grid2>
      )}
    </>
  );
});

export default Shop;
