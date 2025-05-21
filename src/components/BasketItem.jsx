import { TableRow, TableCell, Typography, IconButton } from "@mui/material";
import { Delete, AddOutlined, RemoveOutlined } from "@mui/icons-material";

const BasketItem = ({
  id,
  name,
  price,
  image,
  quantity,
  increment,
  decrement,
  remove,
}) => {
  return (
    <TableRow>
      <TableCell>
        {image ? (
          <img
            style={{
              objectFit: "contain",
              maxHeight: 100,
              maxWidth: "100%",
            }}
            src={image}
            alt={name}
          />
        ) : (
          <img
            width={100}
            src="http://via.placeholder.com/300"
            alt="Placeholder"
          />
        )}
      </TableCell>
      <TableCell>
        <Typography>{name}</Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" color="textSecondary">
          {price} BYN
        </Typography>
      </TableCell>
      <TableCell>
        <IconButton onClick={() => decrement(id)} size="small" color="primary">
          <RemoveOutlined />
        </IconButton>
        <Typography component="span" sx={{ mx: 1, fontWeight: "bold" }}>
          {quantity}
        </Typography>
        <IconButton onClick={() => increment(id)} size="small" color="primary">
          <AddOutlined />
        </IconButton>
      </TableCell>
      <TableCell>
        <Typography variant="body2" fontStyle="italic" fontWeight="bold">
          {+(price * quantity).toFixed(2)} BYN
        </Typography>
      </TableCell>
      <TableCell>
        <IconButton onClick={() => remove(id)}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default BasketItem;
