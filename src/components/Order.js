import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
} from "@mui/material";

const Order = ({ data }) => {
  return (
    <Box>
      <Typography variant="h6" color="primary" gutterBottom>
        Информация о заказе
      </Typography>
      <List>
        <ListItem>
          <ListItemText>{`Дата заказа: ${data.prettyCreatedAt}`} </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>{`Статус заказа: ${
            data.status === 0
              ? "Новый"
              : data.status === 1
                ? "В пути"
                : "Доставлен"
          }`}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>{`Имя, фамилия: ${data.name}`}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>{`Адрес почты: ${data.email}`}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>{`Номер телефона: ${data.phone}`}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>{`Адрес доставки: ${data.address}`}</ListItemText>
        </ListItem>
        <ListItem>
          <ListItemText>{`Комментарий: ${data.comment || "Отсутствует"}`}</ListItemText>
        </ListItem>
      </List>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Название</TableCell>
            <TableCell>Цена</TableCell>
            <TableCell>Количество</TableCell>
            <TableCell>Сумма</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.price} BYN</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>
                {(item.price * item.quantity).toFixed(2)} BYN
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={3} sx={{ fontWeight: "bold" }}>
              Итого
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>{data.amount} BYN</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default Order;
