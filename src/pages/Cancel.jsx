import { Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <Box
      textAlign="center"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={1}
    >
      <Typography variant="h4">Оплата не прошла</Typography>
      <Typography>Вы можете попробовать снова</Typography>
      <Button
        component={Link}
        to="/basket"
        variant="contained"
        sx={{ py: "10px" }}
      >
        Повторить заказ
      </Button>
    </Box>
  );
}
