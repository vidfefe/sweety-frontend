import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import {
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Box,
} from "@mui/material";

import { formatDate } from "../utils/formatDate";

const Orders = ({ items, admin }) => {
  if (items.length === 0) {
    return (
      <Typography align="center" variant="h6">
        Список заказов пустой
      </Typography>
    );
  }

  return (
    <Box sx={{ overflowX: "auto", width: "100%" }}>
      <Table size="small" sx={{ minWidth: 800 }}>
        <TableHead>
          <TableRow>
            <TableCell>№</TableCell>
            <TableCell>Дата</TableCell>
            <TableCell>Покупатель</TableCell>
            <TableCell>Адрес почты</TableCell>
            <TableCell>Телефон</TableCell>
            <TableCell>Статус</TableCell>
            <TableCell>Сумма</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{formatDate(item.createdAt)}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>
                {item.status === 0 && "Оформлен"}
                {item.status === 1 && "В пути"}
                {item.status === 2 && "Доставлен"}
              </TableCell>
              <TableCell sx={{ fontStyle: "italic", fontWeight: "bold" }}>
                {item.amount} BYN
              </TableCell>
              <TableCell>
                <IconButton
                  component={Link}
                  to={
                    admin ? `/admin/order/${item.id}` : `/user/order/${item.id}`
                  }
                >
                  <SearchIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Orders;
