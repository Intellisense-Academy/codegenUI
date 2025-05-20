import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Box,
  Typography,
  IconButton,
  useMediaQuery
} from "@mui/material";
import { Menu, ExpandLess, ExpandMore } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const Sidebar = ({ setSelectedSchema }) => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [dashboardItems, setDashboardItems] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // screens <600px

  const toggleDashboard = () => setIsDashboardOpen(!isDashboardOpen);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch("http://localhost:8080/schemas");
        const data = await response.json();
        setDashboardItems(data);
      } catch (error) {
        console.error("Failed to fetch menu items", error);
      }
    };
    fetchMenu();
  }, []);

  const drawerContent = (
    <Box sx={{ padding: 2}}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Menu
      </Typography>
      <List component="nav">
        <ListItem disablePadding>
          <ListItemButton onClick={() => setSelectedSchema(null)}>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItemButton onClick={toggleDashboard}>
          <ListItemText primary="Assets" />
          {isDashboardOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={isDashboardOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {dashboardItems.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => {
                    setSelectedSchema(item.title);
                    if (isMobile) setMobileOpen(false); // close drawer on mobile after click
                  }}
                >
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Collapse>
      </List>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ m: 1 }}
        >
          <Menu />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          width: 250,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 250,
            boxSizing: "border-box",
            backgroundColor: "#f5f5f5",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
