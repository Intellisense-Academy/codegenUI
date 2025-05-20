import React, { useState } from "react";
import { Box, CssBaseline, Typography } from "@mui/material";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import SchemaDetail from "../../components/SchemaDetail";

const Home = () => {
  const [selectedSchema, setSelectedSchema] = useState(null);

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        {/* Sticky Header */}
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "60px",
            zIndex: 1300, // higher than drawer/sidebar
            bgcolor: "background.paper",
            boxShadow: 1,
          }}
        >
          <Header />
        </Box>

        {/* Sidebar + Main Content below the header */}
        <Box sx={{ display: "flex", flexGrow: 1, pt: "60px", height: "100%" }}>
          {/* Sidebar */}
          <Box
            sx={{
              width: "250px",
              bgcolor: "grey.100",
              overflowY: "auto",
              height: "calc(100vh - 60px)",
              position: "fixed",
              top: "60px",
              left: 0,
              bottom: 0,
              zIndex: 1200,
              boxShadow: 1,
            }}
          >
            <Sidebar setSelectedSchema={setSelectedSchema} />
          </Box>

          {/* Main Content */}
          <Box
            sx={{
              flexGrow: 1,
              ml: "250px", // to make space for fixed sidebar
              p: 3,
              overflowY: "auto",
              height: "calc(100vh - 60px)",
              bgcolor: "#f1f3f6",
            }}
          >
            {selectedSchema ? (
              <SchemaDetail schemaTitle={selectedSchema} />
            ) : (
              <Box>
                <Typography variant="h4" gutterBottom>
                  Welcome to the Dashboard
                </Typography>
                <Typography>Select an item from the sidebar to view its data.</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
export default Home;