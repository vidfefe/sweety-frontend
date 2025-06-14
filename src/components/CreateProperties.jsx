import { Button, TextField, IconButton, Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Delete } from "@mui/icons-material";
import uuid from "react-uuid";

const CreateProperties = (props) => {
  const { properties, setProperties } = props;

  const append = () => {
    setProperties([...properties, { name: "", value: "", number: uuid() }]);
  };
  const remove = (number) => {
    setProperties(properties.filter((item) => item.number !== number));
  };
  const change = (key, value, number) => {
    setProperties(
      properties.map((item) =>
        item.number === number ? { ...item, [key]: value } : item,
      ),
    );
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          my: 2,
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ marginRight: 2 }}>
          Характеристики
        </Typography>
        <Button
          sx={{ py: "10px" }}
          onClick={append}
          variant="outlined"
          size="small"
        >
          Добавить
        </Button>
      </Box>

      {properties.map((item) => (
        <Grid container spacing={2} key={item.number} sx={{ marginBottom: 2 }}>
          <Grid size={{ xs: 4 }}>
            <TextField
              fullWidth
              name={"name_" + item.number}
              value={item.name}
              onChange={(e) => change("name", e.target.value, item.number)}
              label="Название..."
              size="small"
            />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <TextField
              fullWidth
              name={"value_" + item.number}
              value={item.value}
              onChange={(e) => change("value", e.target.value, item.number)}
              label="Значение..."
              size="small"
            />
          </Grid>
          <Grid size={{ xs: 4 }}>
            <IconButton onClick={() => remove(item.number)} size="small">
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default CreateProperties;
