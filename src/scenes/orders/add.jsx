import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  TextField,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Header from "components/Header";
import { useState } from "react";
import { useCreateOrderMutation } from "state/apiOrder";

function CreateOrderForm() {
  const [orderId, setOrderId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [date, setDate] = useState(null);
  const [total, setTotal] = useState("");
  const [createOrder] = useCreateOrderMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const order = {
      orderId,
      customerId,
      date,
      total,
    };

    try {
      await createOrder(order).unwrap();
      setOrderId("");
      setCustomerId("");
      setDate(null);
      setTotal("");
      window.confirm("Add Successful Order");
    } catch (error) {
      console.error("Failed to create order: ", error);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CREATE ORDER" subtitle="Form create order" />
      <form onSubmit={handleSubmit}>
        <Box
          mt="40px"
          height="75vh"
          sx={{
            "& .MuiInputBase-root": {
              width: "50vh",
            },
          }}
        >
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "1000vh" }}
          >
            <Grid item xs={4}>
              <Box>
                <FormControl sx={{ mt: 3 }}>
                  <InputLabel htmlFor="orderId">Order Id</InputLabel>
                  <TextField
                    fullWidth
                    disabled
                    variant="outlined"
                    type="text"
                    value={orderId}
                    onChange={(event) => setOrderId(event.target.value)}
                  />
                  <FormHelperText id="my-helper-text">
                    Write Order Id
                  </FormHelperText>
                </FormControl>
              </Box>

              <Box>
                <FormControl sx={{ mt: 3 }}>
                  <TextField
                    label="Customer Id"
                    variant="outlined"
                    type="text"
                    value={customerId}
                    onChange={(event) => setCustomerId(event.target.value)}
                  />
                  <FormHelperText id="my-helper-text">
                    Write Customer Id
                  </FormHelperText>
                </FormControl>
              </Box>

              <Box>
                <FormControl sx={{ mt: 3 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      variant="outlined"
                      label="Date of purchase"
                      inputFormat="YYYY/MM/DD"
                      value={date}
                      onChange={(e) => setDate(e)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                  <FormHelperText id="my-helper-text">
                    Please select a date
                  </FormHelperText>
                </FormControl>
              </Box>

              <Box>
                <FormControl sx={{ mt: 3 }}>
                  <TextField
                    label="Total price"
                    variant="outlined"
                    value={total}
                    onChange={(event) => setTotal(event.target.value)}
                  />
                  <FormHelperText id="my-helper-text">
                    Write Total price
                  </FormHelperText>
                </FormControl>
              </Box>

              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button>Cancel</Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ ml: 2 }}
                  type="submit"
                >
                  Save
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Box>
  );
}
export default CreateOrderForm;
