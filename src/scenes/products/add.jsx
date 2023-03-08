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
import { useState } from "react";
import {
  useCreateFileMutation,
  useCreateProductMutation,
} from "state/apiProduct";

function CreateProductForm() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category_name, setCategory_name] = useState("");
  const [file, setFile] = useState(null);
  const [updateFile] = useCreateFileMutation();
  const [product, setProduct] = useState({});
  const [error, setError] = useState({});

  const [createProduct] = useCreateProductMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      id,
      name,
      price,
      description,
      image,
      quantity,
      category_name,
    };
  };
  const handleChange = (e) => {
    console.log(e.target.name);
    if (e.target.name === "image") {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile, selectedFile.name);
        setFile(formData);
        setProduct({
          ...product,
          image: selectedFile.name,
        });
      }
    } else {
      setProduct({
        ...product,
        [e.target.name]: e.target.value,
      });
    }
    const { name, value } = e.target;
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
              <TextField
                fullWidth
                type="file"
                label="Image :"
                name="image"
                onChange={handleChange}
                variant="outlined"
                size="small"
              />
            </Box>
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button variant="outlined" sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  createProduct(product);
                  updateFile(file);
                  console.log(product);
                  window.confirm("Add Successful Product");
                }}
              >
                Save
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}
export default CreateProductForm;
