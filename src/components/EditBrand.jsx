import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { createBrand, fetchBrand, updateBrand } from "../http/catalogAPI.js";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/useToast.jsx";

const EditBrand = ({ id, show, setShow, setChange }) => {
  const [name, setName] = useState("");
  const [valid, setValid] = useState(null);
  const showToast = useToast();

  useEffect(() => {
    if (id) {
      fetchBrand(id)
        .then((data) => {
          setName(data.name);
          setValid(data.name !== "");
        })
        .catch((error) => {
          console.error(error.response.data.message);
          showToast("Ошибка при загрузке бренда", "error");
        });
    } else {
      setName("");
      setValid(null);
    }
  }, [id]);

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
        showToast(`Бренд успешно ${id ? "обновлен" : "добавлен"}`, "success");
      };
      const error = (error) => {
        showToast(
          `Ошибка при ${id ? "обновлении" : "добавлении"} бренда`,
          "error",
        );
        console.error(error.response.data.message);
      };
      id
        ? updateBrand(id, data).then(success).catch(error)
        : createBrand(data).then(success).catch(error);
    }
  };

  return (
    <Dialog open={show} onClose={() => setShow(false)} fullWidth maxWidth="sm">
      <DialogTitle>{id ? "Редактирование" : "Создание"} бренда</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Название бренда"
          value={name}
          onChange={handleChange}
          error={valid === false}
          helperText={valid === false ? "Введите название бренда" : ""}
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

export default EditBrand;
