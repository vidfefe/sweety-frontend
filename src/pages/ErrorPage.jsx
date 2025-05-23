import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ErrorPage = () => {
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
      <Typography variant="h4">Упс... что-то пошло не так</Typography>
      <Button component={Link} to="/" variant="contained" sx={{ py: "10px" }}>
        На главную
      </Button>
    </Box>
  );
};

export default ErrorPage;
