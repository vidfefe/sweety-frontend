import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  FormHelperText,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  fetchOneProduct,
  updateProduct,
  fetchCategories,
  fetchBrands,
} from "../http/catalogAPI.js";
import { useState, useEffect } from "react";
import uuid from "react-uuid";
import UpdateProperties from "./UpdateProperties.jsx";
import SelectCategory from "./SelectCategory.jsx";
import SelectBrand from "./SelectBrand.jsx";
import {
  createProperty,
  updateProperty,
  deleteProperty,
} from "../http/catalogAPI.js";

const defaultValue = { name: "", price: "", category: "", brand: "" };
const defaultValid = { name: null, price: null, category: null, brand: null };

const isValid = (value) => {
  const result = {};
  const pattern = /^[1-9][0-9]*$/;
  const pricePattern = /^[0-9]+(?:\.[0-9]+)?$/;
  for (let key in value) {
    if (key === "name") result.name = value.name.trim() !== "";
    if (key === "price") result.price = pricePattern.test(value.price.trim());
    if (key === "category") result.category = pattern.test(value.category);
    if (key === "brand") result.brand = pattern.test(value.brand);
  }
  return result;
};

const updateProperties = async (properties, productId) => {
  for (const prop of properties) {
    const empty = prop.name.trim() === "" || prop.value.trim() === "";
    if (empty && prop.id) {
      try {
        await deleteProperty(productId, prop);
      } catch (error) {
        alert(error.response.data.message);
      }
      continue;
    }
    if (prop.append && !empty) {
      try {
        await createProperty(productId, prop);
      } catch (error) {
        alert(error.response.data.message);
      }
      continue;
    }
    if (prop.change && !prop.remove) {
      try {
        await updateProperty(productId, prop.id, prop);
      } catch (error) {
        alert(error.response.data.message);
      }
      continue;
    }
    if (prop.remove) {
      try {
        await deleteProperty(productId, prop.id);
      } catch (error) {
        alert(error.response.data.message);
      }
      continue;
    }
  }
};

const UpdateProduct = ({ id, show, setShow, setChange }) => {
  const [value, setValue] = useState(defaultValue);
  const [valid, setValid] = useState(defaultValid);
  const [categories, setCategories] = useState(null);
  const [brands, setBrands] = useState(null);
  const [image, setImage] = useState(null);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    if (id) {
      fetchOneProduct(id)
        .then((data) => {
          const prod = {
            name: data.name,
            price: data.price.toString(),
            category: data.categoryId.toString(),
            brand: data.brandId.toString(),
          };
          setValue(prod);
          setValid(isValid(prod));
          setProperties(
            data.props.map((item) => ({
              ...item,
              unique: uuid(),
              append: false,
              remove: false,
              change: false,
            })),
          );
        })
        .catch((error) => alert(error.response.data.message));
      fetchCategories().then(setCategories);
      fetchBrands().then(setBrands);
    }
  }, [id]);

  const handleInputChange = (event) => {
    const data = { ...value, [event.target.name]: event.target.value };
    setValue(data);
    setValid(isValid(data));
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const correct = isValid(value);
    setValid(correct);

    if (correct.name && correct.price && correct.category && correct.brand) {
      const data = new FormData();
      data.append("name", value.name.trim());
      data.append("price", value.price);
      data.append("categoryId", value.category);
      data.append("brandId", value.brand);
      if (image) data.append("image", image, image.name);

      if (properties.length) {
        await updateProperties(properties, id);
      }

      updateProduct(id, data)
        .then((data) => {
          setValue({
            name: data.name,
            price: data.price.toString(),
            category: data.categoryId.toString(),
            brand: data.brandId.toString(),
          });
          setValid(isValid(value));
          setProperties(
            data.props.map((item) => ({
              ...item,
              unique: uuid(),
              append: false,
              remove: false,
              change: false,
            })),
          );
          setShow(false); // ✅ Исправлено: теперь модальное окно закрывается после успешного обновления
          setChange((prev) => !prev); // ✅ Исправлено: теперь список товаров обновляется
        })
        .catch((error) => alert(error.response.data.message));
    }
  };

  return (
    <Dialog open={show} onClose={() => setShow(false)} maxWidth="md" fullWidth>
      <DialogTitle>Редактирование товара</DialogTitle>
      <DialogContent>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="name"
            value={value.name}
            onChange={handleInputChange}
            error={valid.name === false}
            helperText={
              valid.name === false ? "Название товара не может быть пустым" : ""
            }
            label="Название товара"
            margin="normal"
          />
          <Grid container spacing={2}>
            <Grid size={{ xs: 6 }}>
              <SelectCategory
                categories={categories}
                value={value}
                handleInputChange={handleInputChange}
                valid={valid}
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <SelectBrand
                brands={brands}
                value={value}
                handleInputChange={handleInputChange}
                valid={valid}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid size={{ xs: 6 }}>
              <TextField
                fullWidth
                name="price"
                value={value.price}
                onChange={handleInputChange}
                error={valid.price === false}
                helperText={valid.price === false ? "Некорректная цена" : ""}
                label="Цена товара"
                type="number"
              />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <Button
                sx={{ py: "20px" }}
                variant="contained"
                component="label"
                fullWidth
              >
                Загрузить фото
                <input type="file" hidden onChange={handleImageChange} />
              </Button>
              {image && <FormHelperText>{image.name}</FormHelperText>}
            </Grid>
          </Grid>
          <UpdateProperties
            properties={properties}
            setProperties={setProperties}
          />
          <DialogActions>
            <Button
              sx={{ py: "10px" }}
              onClick={() => setShow(false)}
              color="secondary"
            >
              Отмена
            </Button>
            <Button
              sx={{ py: "10px" }}
              type="submit"
              color="primary"
              variant="contained"
            >
              Сохранить
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProduct;
