import { useContext } from "react";
import { AppContext } from "./AppContext.js";
import { observer } from "mobx-react-lite";
import { useNavigate, createSearchParams } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FilterAccordion = observer(() => {
  const { catalog } = useContext(AppContext);
  const navigate = useNavigate();

  const handleCategoryClick = (id) => {
    catalog.category = id === catalog.category ? null : id;
    updateFilters();
  };

  const handleBrandClick = (id) => {
    catalog.brand = id === catalog.brand ? null : id;
    updateFilters();
  };

  const updateFilters = () => {
    const params = {};
    if (catalog.category) params.category = catalog.category;
    if (catalog.brand) params.brand = catalog.brand;
    if (catalog.page > 1) params.page = catalog.page;
    navigate({
      pathname: "/",
      search: "?" + createSearchParams(params),
    });
  };

  return (
    <Box>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="h6">Категории</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List component="nav">
            {catalog.categories.map((item) => (
              <ListItemButton
                key={item.id}
                selected={item.id === catalog.category}
                onClick={() => handleCategoryClick(item.id)}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="h6">Бренды</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List component="nav">
            {catalog.brands.map((item) => (
              <ListItemButton
                key={item.id}
                selected={item.id === catalog.brand}
                onClick={() => handleBrandClick(item.id)}
              >
                <ListItemText primary={item.name} />
              </ListItemButton>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
});

export default FilterAccordion;
