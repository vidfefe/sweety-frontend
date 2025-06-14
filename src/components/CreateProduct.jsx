import Grid from "@mui/material/Grid2";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormHelperText,
} from "@mui/material";
import uuid from "react-uuid";
import {
  createProduct,
  fetchCategories,
  fetchBrands,
} from "../http/catalogAPI.js";
import { useState, useEffect } from "react";
import CreateProperties from "./CreateProperties.jsx";
import SelectBrand from "./SelectBrand.jsx";
import SelectCategory from "./SelectCategory.jsx";
import { useToast } from "@/hooks/useToast.jsx";

const defaultValue = { name: "", price: "", category: "", brand: "" };
const defaultValid = { name: null, price: null, category: null, brand: null };
const DEFAULT_PROPERTIES = [
  "Срок годности",
  "Количество",
  "Вес за 1 шт",
  "Энергетическая ценность (ккал): в 1 порции",
  "Углеводы: в 1 порции",
  "Жиры: в 1 порции",
  "Белок: в 1 порции",
  "Состав",
];

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

const CreateProduct = ({ show, setShow, setChange }) => {
  const [value, setValue] = useState(defaultValue);
  const [valid, setValid] = useState(defaultValid);
  const [image, setImage] = useState(null);
  const [properties, setProperties] = useState([]);
  const [categories, setCategories] = useState(null);
  const [brands, setBrands] = useState(null);
  const showToast = useToast();

  useEffect(() => {
    if (show) {
      fetchCategories().then((data) => setCategories(data));
      fetchBrands().then((data) => setBrands(data));
      setProperties(
        DEFAULT_PROPERTIES.map((name) => ({
          id: null,
          name,
          value: "",
          number: uuid(),
        })),
      );
    }
  }, [show]);

  const handleInputChange = (event) => {
    const data = { ...value, [event.target.name]: event.target.value };
    setValue(data);
    setValid(isValid(data));
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const correct = isValid(value);
    setValid(correct);

    if (correct.name && correct.price && correct.category && correct.brand) {
      const data = new FormData();
      data.append("name", value.name.trim());
      data.append("price", value.price.trim());
      data.append("categoryId", value.category);
      data.append("brandId", value.brand);
      if (image) data.append("image", image, image.name);
      if (properties.length) {
        const props = properties.filter(
          (prop) => prop.name.trim() !== "" && prop.value.trim() !== "",
        );
        if (props.length) {
          data.append("props", JSON.stringify(props));
        }
      }

      createProduct(data)
        .then(() => {
          setValue(defaultValue);
          setValid(defaultValid);
          setProperties([]);
          setImage(null);
          setShow(false);
          setChange((prev) => !prev);
          showToast("Товар успешно добавлен", "success");
        })
        .catch((error) => {
          console.error(error);
          showToast("Ошибка при добавлении товара", "error");
        });
    }
  };

  return (
    <Dialog open={show} onClose={() => setShow(false)} maxWidth="md" fullWidth>
      <DialogTitle>Новый товар</DialogTitle>
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
          <CreateProperties
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

export default CreateProduct;
