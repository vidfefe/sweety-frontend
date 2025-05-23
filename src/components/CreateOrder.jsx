import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

const CreateOrder = (props) => {
  const { show, setShow } = props;
  return (
    <Dialog open={show} onClose={() => setShow(false)} maxWidth="md" fullWidth>
      <DialogTitle>Новый заказ</DialogTitle>
      <DialogActions>
        <Button
          sx={{ py: "10px" }}
          onClick={() => setShow(false)}
          color="secondary"
        >
          Отмена
        </Button>
        <Button
          sx={{ py: "10px" }}
          type="submit"
          color="primary"
          variant="contained"
        >
          Сохранить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateOrder;
