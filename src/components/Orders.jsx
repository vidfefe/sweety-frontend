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
} from "@mui/material";

const Orders = ({ items, admin }) => {
  if (items.length === 0) {
    return (
      <Typography align="center" variant="h6">
        Список заказов пустой
      </Typography>
    );
  }

  return (
    <Table size="small">
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
            <TableCell>{item.prettyCreatedAt}</TableCell>
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
  );
};

export default Orders;
