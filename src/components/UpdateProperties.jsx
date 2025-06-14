import { Button, TextField, IconButton, Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Delete } from "@mui/icons-material";
import uuid from "react-uuid";

const UpdateProperties = (props) => {
  const { properties, setProperties } = props;

  const append = () => {
    setProperties([
      ...properties,
      { id: null, name: "", value: "", unique: uuid(), append: true },
    ]);
  };
  const remove = (unique) => {
    const item = properties.find((elem) => elem.unique === unique);
    if (item.id) {
      setProperties(
        properties.map((elem) =>
          elem.unique === unique
            ? { ...elem, change: false, remove: true }
            : elem,
        ),
      );
    } else {
      setProperties(properties.filter((elem) => elem.unique !== unique));
    }
  };

  const change = (key, value, unique) => {
    setProperties(
      properties.map((item) =>
        item.unique === unique
          ? { ...item, [key]: value, change: !item.append }
          : item,
      ),
    );
  };

  return (
    <>
      <Box sx={{ display: "flex", my: 2, alignItems: "center" }}>
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
        <Grid
          container
          spacing={2}
          key={item.unique}
          sx={{ marginBottom: 2, display: item.remove ? "none" : "flex" }}
        >
          <Grid xs={4}>
            <TextField
              fullWidth
              name={"name_" + item.unique}
              value={item.name}
              onChange={(e) => change("name", e.target.value, item.unique)}
              label="Название"
              size="small"
            />
          </Grid>
          <Grid xs={4}>
            <TextField
              fullWidth
              name={"value_" + item.unique}
              value={item.value}
              onChange={(e) => change("value", e.target.value, item.unique)}
              label="Значение"
              size="small"
            />
          </Grid>
          <Grid xs={4}>
            <IconButton onClick={() => remove(item.unique)} size="small">
              <Delete />
            </IconButton>
            {item.change && " *"}
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default UpdateProperties;
