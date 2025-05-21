import { useState, useEffect } from "react";
import { fetchAllProducts, deleteProduct } from "../http/catalogAPI.js";
import CreateProduct from "../components/CreateProduct.jsx";
import UpdateProduct from "../components/UpdateProduct.jsx";
import Loader from "../components/Loader.jsx";
import {
  Delete,
  AddOutlined,
  InsertPhotoOutlined,
  EditOutlined,
} from "@mui/icons-material";
import {
  Typography,
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
const ADMIN_PER_PAGE = 12;

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [createShow, setCreateShow] = useState(false);
  const [updateShow, setUpdateShow] = useState(false);
  const [change, setChange] = useState(false);
  const [product, setProduct] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    setFetching(true);
  };

  const handleUpdateClick = (id) => {
    setProduct(id);
    setUpdateShow(true);
  };

  const handleDeleteClick = (id) => {
    deleteProduct(id)
      .then((data) => {
        if (
          totalPages > 1 &&
          products.length === 1 &&
          currentPage === totalPages
        ) {
          setCurrentPage(currentPage - 1);
        } else {
          setChange(!change);
        }
        alert(`Товар «${data.name}» удален`);
      })
      .catch((error) => alert(error.response.data.message));
  };

  useEffect(() => {
    fetchAllProducts(null, null, currentPage, ADMIN_PER_PAGE)
      .then((data) => {
        setProducts(data.rows);
        setTotalPages(Math.ceil(data.count / ADMIN_PER_PAGE));
      })
      .finally(() => setFetching(false));
  }, [change, currentPage]);

  if (fetching) {
    return <Loader />;
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Товары
      </Typography>
      <Button
        sx={{ py: "10px" }}
        startIcon={<AddOutlined />}
        variant="contained"
        onClick={() => setCreateShow(true)}
      >
        Создать товар
      </Button>
      <CreateProduct
        show={createShow}
        setShow={setCreateShow}
        setChange={setChange}
      />
      <UpdateProduct
        id={product}
        show={updateShow}
        setShow={setUpdateShow}
        setChange={setChange}
      />
      {products.length > 0 ? (
        <>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Название</TableCell>
                <TableCell>Фото</TableCell>
                <TableCell>Категория</TableCell>
                <TableCell>Бренд</TableCell>
                <TableCell>Цена</TableCell>
                <TableCell>Редактировать</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    {item.image && (
                      <IconButton
                        component="a"
                        href={item.image}
                        target="_blank"
                      >
                        <InsertPhotoOutlined />
                      </IconButton>
                    )}
                  </TableCell>
                  <TableCell>{item.category?.name || "NULL"}</TableCell>
                  <TableCell>{item.brand?.name || "NULL"}</TableCell>
                  <TableCell>{item.price} BYN</TableCell>
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
          {totalPages > 1 && (
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              sx={{ mt: 3, display: "flex", justifyContent: "center" }}
            />
          )}
        </>
      ) : (
        <Typography
          sx={{ textAlign: "center", mt: 4 }}
          variant="h6"
          color="textSecondary"
        >
          Список товаров пустой
        </Typography>
      )}
    </>
  );
};

export default AdminProducts;
