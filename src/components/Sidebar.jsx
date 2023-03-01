import React from "react";
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
  ExpandMore,
  ExpandLess,
  StarBorder,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpeg";

const navItems = [
  //   {
  //     text: "Dashboard",
  //     icon: <HomeOutlined />,
  //   },
//   {
//     text: "Client Facing",
//     icon: null,
//   },
  //   {
  //     text: "Products",
  //     icon: <ShoppingCartOutlined />,
  //   },
//   {
//     text: "Customers",
//     icon: <Groups2Outlined />,
//   },
  {
    text: "Orders",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Geography",
    icon: <PublicOutlined />,
  },
  {
    text: "Sales",
    icon: null,
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Daily",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Breakdown",
    icon: <PieChartOutlined />,
  },
  {
    text: "Management",
    icon: null,
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Performance",
    icon: <TrendingUpOutlined />,
  },
];

const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const [productsOpen, setProductsOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);
  const [customersOpen, setCustomersOpen] = useState(false);

  const handleProductsDropDown = () => {
    setProductsOpen(!productsOpen);
  };
  const handleCategoriesDropDown = () => {
    setCategoriesOpen(!categoriesOpen);
  };
  const handleOrdersDropDown = () => {
    setOrdersOpen(!ordersOpen);
  };
  const handleUsersDropDown = () => {
    setUsersOpen(!usersOpen);
  };
  const handleCustomersDropDown = () => {
    setCustomersOpen(!customersOpen);
  };

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    ArtGeeks
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              <ListItem key="Dashboard" disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate("/dashboard");
                    setActive("dashboard");
                  }}
                  sx={{
                    backgroundColor:
                      active === "dashboard"
                        ? theme.palette.secondary[300]
                        : "transparent",
                    color:
                      active === "dashboard"
                        ? theme.palette.primary[600]
                        : theme.palette.secondary[100],
                  }}
                >
                  <ListItemIcon
                    sx={{
                      ml: "2rem",
                    }}
                  >
                    <HomeOutlined />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </ListItem>
              <Typography key="Client Facing" sx={{ m: "2.25rem 0 1rem 3rem" }}>
                Client Facing
              </Typography>
              <ListItem key="Products" disablePadding>
                <ListItemButton onClick={handleProductsDropDown}>
                  <ListItemIcon
                    sx={{
                      ml: "2rem",
                    }}
                  >
                    <ShoppingCartOutlined />
                  </ListItemIcon>
                  <ListItemText primary="Products" />
                  {productsOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={productsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    onClick={() => {
                      // navigate('/addProducts');
                      setActive("addProducts");
                    }}
                    sx={{
                      backgroundColor:
                        active === "addProducts"
                          ? theme.palette.secondary[300]
                          : "transparent",
                      color:
                        active === "addProducts"
                          ? theme.palette.primary[600]
                          : theme.palette.secondary[100],
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        ml: "3rem",
                      }}
                    >
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Add Products" />
                  </ListItemButton>
                </List>
              </Collapse>
              <Collapse in={productsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    onClick={() => {
                      // navigate('/addProducts');
                      setActive("products");
                    }}
                    sx={{
                      backgroundColor:
                        active === "products"
                          ? theme.palette.secondary[300]
                          : "transparent",
                      color:
                        active === "products"
                          ? theme.palette.primary[600]
                          : theme.palette.secondary[100],
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        ml: "3rem",
                      }}
                    >
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Products" />
                  </ListItemButton>
                </List>
              </Collapse>
              <ListItem key="Customers" disablePadding>
                <ListItemButton onClick={handleCustomersDropDown}>
                  <ListItemIcon
                    sx={{
                      ml: "2rem",
                    }}
                  >
                    <Groups2Outlined />
                  </ListItemIcon>
                  <ListItemText primary="Customers" />
                  {customersOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={customersOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    onClick={() => {
                      // navigate('/addProducts');
                      setActive("addCategories");
                    }}
                    sx={{
                      backgroundColor:
                        active === "addCategories"
                          ? theme.palette.secondary[300]
                          : "transparent",
                      color:
                        active === "addCategories"
                          ? theme.palette.primary[600]
                          : theme.palette.secondary[100],
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        ml: "3rem",
                      }}
                    >
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Add Customers" />
                  </ListItemButton>
                </List>
              </Collapse>
              <Collapse in={customersOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton
                    onClick={() => {
                      // navigate('/addProducts');
                      setActive("customers");
                    }}
                    sx={{
                      backgroundColor:
                        active === "customers"
                          ? theme.palette.secondary[300]
                          : "transparent",
                      color:
                        active === "customers"
                          ? theme.palette.primary[600]
                          : theme.palette.secondary[100],
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        ml: "3rem",
                      }}
                    >
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Customers" />
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          {/* <Box position="absolute" bottom="2rem"> */}
          <Box>
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px ",
                }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
