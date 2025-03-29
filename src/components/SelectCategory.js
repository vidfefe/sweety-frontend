import React from "react";
import { FormControl, MenuItem, Select, FormHelperText } from "@mui/material";

const SelectCategory = ({ categories, value, handleInputChange, valid }) => {
  const handleChange = (event) => {
    handleInputChange({
      target: { name: "category", value: event.target.value },
    });
  };

  return (
    <FormControl fullWidth error={valid.category === false}>
      <Select
        labelId="category-select-label"
        value={value.category || ""}
        onChange={handleChange}
        name="category"
      >
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>Нет доступных категорий</MenuItem>
        )}
      </Select>
      <FormHelperText>
        {valid.category === false ? "Выберите категорию" : ""}
      </FormHelperText>
    </FormControl>
  );
};

export default SelectCategory;
