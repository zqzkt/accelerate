import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import ProfileDrawer from "./ProfileDrawer";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "black" }}>
      <AppBar
        position="sticky"
        sx={{
          boxShadow: "none",
          borderBottom: "solid 1px gray",
          backgroundColor: "black",
        }}
      >
        <Toolbar>
          <Button sx={{ "&:hover": { backgroundColor: "#32174d" } }}>
            <Typography variant="h5" component="div">
              <Link
                to="/dashboard"
                style={{
                  color: "white",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "none",
                  },
                  "&:active": { textDecoration: "none" },
                  "&:visited": { textDecoration: "none" },
                  "&:focus": { textDecoration: "none" },
                }}
              >
                Accelerate
              </Link>
            </Typography>
          </Button>

          <Button
            color="inherit"
            sx={{ "&:hover": { backgroundColor: "#32174d" } }}
          >
            <Link
              to="/in_progress_courses"
              style={{
                color: "white",
                textDecoration: "none",
                "&:hover": { textDecoration: "none" },
                "&:active": { textDecoration: "none" },
                "&:visited": { textDecoration: "none" },
                "&:focus": { textDecoration: "none" },
              }}
            >
              My Progress
            </Link>
          </Button>
          <Button
            color="inherit"
            sx={{ "&:hover": { backgroundColor: "#32174d" } }}
          >
            <Link
              to="/courses"
              style={{
                color: "white",
                textDecoration: "none",
                "&:hover": { textDecoration: "none" },
                "&:active": { textDecoration: "none" },
                "&:visited": { textDecoration: "none" },
                "&:focus": { textDecoration: "none" },
              }}
            >
              All Courses
            </Link>
          </Button>
          <ProfileDrawer />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
