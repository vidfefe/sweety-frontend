import { useState, useEffect } from "react";
import { fetchBrands, deleteBrand } from "../http/catalogAPI.js";
import EditBrand from "../components/EditBrand.jsx";
import Loader from "../components/Loader.jsx";
import { Delete, AddOutlined, EditOutlined } from "@mui/icons-material";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { useToast } from "@/hooks/useToast.jsx";

const AdminBrands = () => {
  const [brands, setBrands] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [show, setShow] = useState(false);
  const [change, setChange] = useState(false);
  const [brandId, setBrandId] = useState(0);
  const showToast = useToast();

  const handleCreateClick = () => {
    setBrandId(0);
    setShow(true);
  };

  const handleUpdateClick = (id) => {
    setBrandId(id);
    setShow(true);
  };

  const handleDeleteClick = (id) => {
    deleteBrand(id)
      .then((data) => {
        setChange(!change);
        showToast(`Бренд «${data.name}» удален`, "warning");
      })
      .catch((error) => showToast(error.response.data.message, "error"));
  };

  useEffect(() => {
    fetchBrands()
      .then((data) => setBrands(data))
      .catch((error) => showToast(error.response.data.message, "error"))
      .finally(() => setFetching(false));
  }, [change]);

  if (fetching) {
    return <Loader />;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Бренды
      </Typography>
      <Button
        sx={{ py: "10px" }}
        startIcon={<AddOutlined />}
        variant="contained"
        onClick={handleCreateClick}
      >
        Создать бренд
      </Button>
      <EditBrand
        id={brandId}
        show={show}
        setShow={setShow}
        setChange={setChange}
      />

      {brands.length > 0 ? (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Редактировать</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brands.map((item) => (
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
          Список брендов пустой
        </Typography>
      )}
    </Box>
  );
};

export default AdminBrands;
