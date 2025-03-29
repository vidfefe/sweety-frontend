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
    // <Table hover size="sm" className="mt-3 orders-container">
    //   <thead>
    //     <tr>
    //       <th>№</th>
    //       <th>Дата</th>
    //       <th>Покупатель</th>
    //       <th>Адрес почты</th>
    //       <th>Телефон</th>
    //       <th>Статус</th>
    //       <th>Сумма</th>
    //       <th></th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {props.items.map((item, index) => (
    //       <tr key={item.id}>
    //         <td>{index + 1}</td>
    //         <td>{item.prettyCreatedAt}</td>
    //         <td>{item.name}</td>
    //         <td>{item.email}</td>
    //         <td>{item.phone}</td>
    //         <td>
    //           {item.status === 0 && <span> Оформлен</span>}
    //           {item.status === 1 && <span> В пути</span>}
    //           {item.status === 2 && <span> Доставлен</span>}
    //         </td>
    //         <td className="fst-italic total-price">{item.amount} BYN </td>
    //         <td>
    //           {props.admin ? (
    //             <Link to={`/admin/order/${item.id}`}>
    //               <img src={searchImg}></img>
    //             </Link>
    //           ) : (
    //             <Link to={`/user/order/${item.id}`}>
    //               <img src={searchImg}></img>
    //             </Link>
    //           )}
    //         </td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </Table>
  );
};

export default Orders;
