import React from "react";
import { FormControl, MenuItem, Select, FormHelperText } from "@mui/material";

const SelectBrand = ({ brands, value, handleInputChange, valid }) => {
  const handleChange = (event) => {
    handleInputChange({ target: { name: "brand", value: event.target.value } });
  };

  return (
    <FormControl fullWidth error={valid.brand === false}>
      <Select
        labelId="brand-select-label"
        value={value.brand || ""}
        onChange={handleChange}
        name="brand"
      >
        {brands && brands.length > 0 ? (
          brands.map((brand) => (
            <MenuItem key={brand.id} value={brand.id}>
              {brand.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>Нет доступных брендов</MenuItem>
        )}
      </Select>
      <FormHelperText>
        {valid.brand === false ? "Выберите бренд" : ""}
      </FormHelperText>
    </FormControl>
  );
};

export default SelectBrand;
