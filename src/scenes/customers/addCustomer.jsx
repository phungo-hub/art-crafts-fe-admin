import {
    Box,
    Button,
    Grid,
    TextField
} from "@mui/material";

import Header from "components/Header";
import UploadWidget from "components/UploadWidget ";
import React, { useState, useEffect } from "react";
import { useCreateCustomerMutation, useCreateFileMutation } from "../../state/apiCustomer";




const AddCustomer = () => {
    const [customer, setCustomer] = useState({});
    const [createCustomer] = useCreateCustomerMutation();
    const [error, setError] = useState({});
    const newError = { ...error };
    const [url, updateUrl] = useState();


    const handleOnUpload = (errorImage, result, widget) => {
        
        if (errorImage) {
            widget.close({
                quiet: true,
            });
            return;
        }
        updateUrl(result?.info?.secure_url);
    }
    
    useEffect(() => {
        let isMounted = true;
        if (url && isMounted) {
            setCustomer(prevCustomer => ({
                ...prevCustomer,
                image: url
            }));
        }
        return () => {
            isMounted = false;
        };
    }, [url]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value
        })
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?]).{8,}$/;
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const regexPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
        if (!value) {
            newError[name] = "This field is required";
        } else if (name === "password" && !regex.test(value)) {
            newError[name] = "Password must contain at least 8 characters with \n at least one uppercase letter, one lowercase letter, \none digit, and one special character";
        } else if (name === "email" && !regexEmail.test(value)) {
            newError[name] = "Your email must be in the form @***.com";
        } else if (name === "phone" && !regexPhone.test(value)) {
            newError[name] = "your phone number starts with 84 or 03, 05, 07, 08, 09.";
        } else {
            delete newError[name];
        }
        console.log(newError);
        setError(newError);
    };
    return (
        <Box m="1.5rem 2.5rem">
            <Header title="Add Customer" subtitle="Add Customer to Customer List" />
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
                                label="First Name:"
                                name="firstName"
                                onChange={handleChange}
                                variant="outlined"
                                size="small"
                                error={error.firstName ? true : false}
                                helperText={error.firstName}
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Last Name:"
                                name="lastName"
                                onChange={handleChange}
                                variant="outlined"
                                size="small"
                                error={error.lastName ? true : false}
                                helperText={error.lastName}
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Email:"
                                name="email"
                                onChange={handleChange}
                                variant="outlined"
                                size="small"
                                error={error.email ? true : false}
                                helperText={error.email}
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Phone:"
                                name="phone"
                                onChange={handleChange}
                                variant="outlined"
                                size="small"
                                error={error.phone ? true : false}
                                helperText={error.phone}
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Address:"
                                name="address"
                                onChange={handleChange}
                                variant="outlined"
                                size="small"
                                error={error.address ? true : false}
                                helperText={error.address}
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Username:"
                                name="username"
                                onChange={handleChange}
                                variant="outlined"
                                size="small"
                                error={error.username ? true : false}
                                helperText={error.username}
                            />
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                type="password"
                                label="Password:"
                                name="password"
                                onChange={handleChange}
                                variant="outlined"
                                size="small"
                                error={error.password ? true : false}
                                helperText={error.password}
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
                                InputLabelProps={{
                                    shrink: true
                                }}
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
                                onClick={(e) => {
                                    if (Object.keys(newError).length === 0) {
                                        createCustomer(customer);
                                        window.confirm("Add Successful Customer");
                                        window.location.reload();
                                    }
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
};
export default AddCustomer;