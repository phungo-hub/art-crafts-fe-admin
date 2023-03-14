import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Header from "components/Header";
import UploadWidget from "components/UploadWidget ";
import { useState, useEffect } from "react";
import {
  useCreateFileMutation,
  useCreateProductMutation,
} from "state/apiProduct";

function CreateProductForm() {
  const [product, setProduct] = useState({});
  const [error, setError] = useState({});
  const [url, updateUrl] = useState();

  function handleOnUpload(errorImage, result, widget) {
    if (errorImage) {
      widget.close({
        quiet: true,
      });
      return;
    }
    updateUrl(result?.info?.secure_url);
  }
  useEffect(() => {
    if (url != null) {
      setProduct({
        ...product,
        image: url,
      });
    }
  }, [url])
 

  const [createProduct] = useCreateProductMutation();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
    const newError = { ...error };
    if (!value) {
      newError[name] = "This field is required";
    } else {
      delete newError[name];
    }
    setError(newError);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Add Product" subtitle="Add Product to Product List" />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={10} sm={8} md={6} lg={4}>
          <form>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label=" Name:"
                name="name"
                onChange={handleChange}
                variant="outlined"

                error={error.name ? true : false}
                helperText={error.name}
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Price:"
                name="price"
                onChange={handleChange}
                variant="outlined"
                size="small"
                error={error.price ? true : false}
                helperText={error.price}
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Description:"
                name="description"
                onChange={handleChange}
                variant="outlined"
                size="small"
                error={error.description ? true : false}
                helperText={error.description}
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Quantity:"
                name="quantity"
                onChange={handleChange}
                variant="outlined"
                size="small"
                error={error.quantity ? true : false}
                helperText={error.quantity}
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Category Name:"
                name="category_name"
                onChange={handleChange}
                variant="outlined"
                size="small"
                error={error.category_name ? true : false}
                helperText={error.category_name}
              />
            </Box>


            <Box sx={{ mb: 3 }}>
              {/* <TextField
                fullWidth
                type="file"
                label="Image :"
                name="image"
                onChange={handleChange}
                variant="outlined"
                size="small"
              /> */}
              <UploadWidget onUpload={handleOnUpload}>
                {({ open }) => {
                  function handleOnClick(e) {
                    e.preventDefault();
                    open();
                  }
                  return <button onClick={handleOnClick}>Upload an Image</button>;
                }}
              </UploadWidget>
            </Box>
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button variant="outlined" sx={{ mr: 2 }}>
                Cancel
              </Button>
              {url && <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  createProduct(product);
                  window.confirm("Add Successful Product");
                  window.location.reload()
                }}
              >
                Save
              </Button>}
            </Box>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}
export default CreateProductForm;
