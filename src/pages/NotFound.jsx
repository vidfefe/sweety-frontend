import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      textAlign="center"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={1}
      minHeight="85vh"
    >
      <Typography variant="h4">Страница не найдена</Typography>
      <Button component={Link} to="/" variant="contained" sx={{ py: "10px" }}>
        На главную
      </Button>
    </Box>
  );
};

export default NotFound;
