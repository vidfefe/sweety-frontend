import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import {
  createCategory,
  fetchCategory,
  updateCategory,
} from "../http/catalogAPI.js";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/useToast.jsx";

const EditCategory = ({ id, show, setShow, setChange }) => {
  const [name, setName] = useState("");
  const [valid, setValid] = useState(null);
  const showToast = useToast();

  useEffect(() => {
    if (show) {
      if (id) {
        fetchCategory(id)
          .then((data) => {
            setName(data.name);
            setValid(data.name !== "");
          })
          .catch((error) => {
            console.error(error.response.data.message);
            showToast("Ошибка при загрузке категории", "error");
          });
      } else {
        setName("");
        setValid(null);
      }
    }
  }, [id, show]);

  const handleChange = (event) => {
    setName(event.target.value);
    setValid(event.target.value.trim() !== "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const correct = name.trim() !== "";
    setValid(correct);
    if (correct) {
      const data = {
        name: name.trim(),
      };
      const success = () => {
        setShow(false);
        setChange((state) => !state);
        showToast(
          `Категория успешно ${id ? "обновлена" : "добавлена"}`,
          "success",
        );
      };
      const error = (error) => {
        showToast(
          `Ошибка при ${id ? "обновлении" : "добавлении"} категории`,
          "error",
        );
        console.error(error.response.data.message);
      };
      id
        ? updateCategory(id, data).then(success).catch(error)
        : createCategory(data).then(success).catch(error);
    }
  };

  return (
    <Dialog open={show} onClose={() => setShow(false)} fullWidth maxWidth="sm">
      <DialogTitle>{id ? "Редактирование" : "Создание"} категории</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Название категории"
          value={name}
          onChange={handleChange}
          error={valid === false}
          helperText={valid === false ? "Введите название категории" : ""}
          sx={{ mt: 2 }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ py: "10px" }}
          onClick={() => setShow(false)}
          variant="outlined"
        >
          Отмена
        </Button>
        <Button sx={{ py: "10px" }} onClick={handleSubmit} variant="contained">
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCategory;
