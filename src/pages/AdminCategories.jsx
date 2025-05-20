import { useState, useEffect } from "react";
import { fetchCategories, deleteCategory } from "../http/catalogAPI.js";
import EditCategory from "../components/EditCategory.jsx";
import Loader from "../components/Loader.jsx";
import { Delete, AddOutlined, EditOutlined } from "@mui/icons-material";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
} from "@mui/material";

const AdminCategories = () => {
  const [categories, setCategories] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [show, setShow] = useState(false);
  const [change, setChange] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  const handleCreateClick = () => {
    setCategoryId(0);
    setShow(true);
  };

  const handleUpdateClick = (id) => {
    setCategoryId(id);
    setShow(true);
  };

  const handleDeleteClick = (id) => {
    deleteCategory(id)
      .then((data) => {
        setChange(!change);
        alert(`Категория «${data.name}» удалена`);
      })
      .catch((error) => alert(error.response.data.message));
  };

  useEffect(() => {
    fetchCategories()
      .then((data) => setCategories(data))
      .finally(() => setFetching(false));
  }, [change]);

  if (fetching) {
    return <Loader />;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Категории
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddOutlined />}
        onClick={handleCreateClick}
        sx={{ py: "10px" }}
      >
        Создать категорию
      </Button>

      <EditCategory
        id={categoryId}
        show={show}
        setShow={setShow}
        setChange={setChange}
      />

      {categories.length > 0 ? (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Редактировать</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleUpdateClick(item.id)}
                  >
                    <EditOutlined />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeleteClick(item.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="body1" align="center">
          Список категорий пустой
        </Typography>
      )}
    </Box>
  );
};

export default AdminCategories;
