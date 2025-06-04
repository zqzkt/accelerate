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
    <Box sx={{ flexGrow: 1, backgroundColor: "white" }}>
      <AppBar position="sticky" color="black">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ mr: 2 }}>
            <Link
              to="/dashboard"
              style={{
                color: "black",
                textDecoration: "none",
                "&:hover": { textDecoration: "none" },
                "&:active": { textDecoration: "none" },
                "&:visited": { textDecoration: "none" },
                "&:focus": { textDecoration: "none" },
              }}
            >
              Accelerate
            </Link>
          </Typography>
          <Button color="inherit">
            <Link
              to="/in_progress_courses"
              style={{
                color: "black",
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
          <Button color="inherit">
            <Link
              to="/courses"
              style={{
                color: "black",
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
          <ProfileDrawer/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
