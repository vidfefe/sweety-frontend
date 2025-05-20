import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Delivery = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Доставка
      </Typography>
      <Typography variant="body2" gutterBottom>
        Доставка продукции осуществляется по всей Беларуси курьерскими службами
        и в пунты самовывоза.
      </Typography>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Бесплатная доставка</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem>
              <ListItemText>
                В пункты самовывоза, бесплатно при заказе от 100 BYN
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                Курьером, бесплатно при заказе от 100 BYN
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                Почтой Беларуси, бесплатно при заказе от 100 BYN
              </ListItemText>
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Список служб доставки</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem>
              <ListItemText>
                Пункты самовывоза: точки самовывоза онлайн-магазинов, почтовые
                отделения
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                Курьерские службы: Яндекс Доставка, EMS, SDEK, DHL Express,
                Delivery Club
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                Почта Беларуси: Белпочта, Meest Express, Европочта
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                Все доступные способы доставки с указанием цены и сроков указаны
                при оформлении заказа
              </ListItemText>
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Детали доставки</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem>
              <ListItemText>
                Точная стоимость доставки рассчитывается при оформлении заказа.
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                Доставка курьером осуществляется только в будние дни с 9:00 до
                18:00.
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                Доставка ко времени временно недоступна.
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                Продукция в шоколаде может терять форму в жаркую погоду.
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                Максимальное количество упаковок чипсов в заказе – 4.
              </ListItemText>
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Отслеживание заказа</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem>
              <ListItemText>
                После отправки заказа на email придет трек-номер.
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                Отслеживание заказа доступно на сайте службы доставки.
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                История заказов доступна для авторизованных пользователей.
              </ListItemText>
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Delivery;
