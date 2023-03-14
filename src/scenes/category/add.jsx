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
  
   import Header from "components/Header";
   import { useState } from "react";
   import {
     
     useCreateCategoryMutation,
   } from "state/apiCategory";
   
   function CreateCategoryForm() {
     const [id, setId] = useState("");
     const [name, setName] = useState("");
    
     
     const [category, setCategory] = useState({});
     const [error, setError] = useState({});
   
     const [createCategory] = useCreateCategoryMutation();
   
     const handleSubmit = async (e) => {
       e.preventDefault();
       const category = {
         id,
         name
        };
     };
     const handleChange = (e) => {
       console.log(e.target.name);
        setCategory({
           ...category,
           [e.target.name]: e.target.value,
         });
       
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
         <Header title="Add Product" subtitle="Add Category to Product List" />
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
         
               <Box mt={2} display="flex" justifyContent="flex-end">
                 <Button variant="outlined" sx={{ mr: 2 }}>
                   Cancel
                 </Button>
                 <Button
                   variant="contained"
                   color="primary"
                   onClick={() => {
                     createCategory(category);
                     window.confirm("Add Successful Category");
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
   export default CreateCategoryForm;
   