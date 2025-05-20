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

const AdminBrands = () => {
  const [brands, setBrands] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [show, setShow] = useState(false);
  const [change, setChange] = useState(false);
  const [brandId, setBrandId] = useState(0);

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
        alert(`Бренд «${data.name}» удален`);
      })
      .catch((error) => alert(error.response.data.message));
  };

  useEffect(() => {
    fetchBrands()
      .then((data) => setBrands(data))
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
    // <Container>
    //   <h3>Бренды</h3>
    //   <Button onClick={() => handleCreateClick()}>Создать бренд</Button>
    //   <EditBrand
    //     id={brandId}
    //     show={show}
    //     setShow={setShow}
    //     setChange={setChange}
    //   />
    //   {brands.length > 0 ? (
    //     <Table bordered hover size="sm" className="mt-3">
    //       <thead>
    //         <tr>
    //           <th>Название</th>
    //           <th>Редактировать</th>
    //           <th></th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {brands.map((item) => (
    //           <tr key={item.id}>
    //             <td>{item.name}</td>
    //             <td>
    //               <Button size="sm" onClick={() => handleUpdateClick(item.id)}>
    //                 Редактировать
    //               </Button>
    //             </td>
    //             <td>
    //               <div
    //                 className="button-delete cursor-pointer"
    //                 onClick={() => handleDeleteClick(item.id)}
    //               >
    //                 <img src={deleteImg}></img>
    //               </div>
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </Table>
    //   ) : (
    //     <p className="empty d-flex flex-column justify-content-center align-items-center ">
    //       Список брендов пустой
    //     </p>
    //   )}
    // </Container>
  );
};

export default AdminBrands;
