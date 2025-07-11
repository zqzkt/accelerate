import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useParams, useLocation } from "react-router-dom";
import ProfileDrawer from "./ProfileDrawer";

export default function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { label: "My Progress", path: "/in_progress_courses" },
    { label: "All Courses", path: "/courses" },
  ];

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "black" }}>
      <AppBar
        position="sticky"
        sx={{
          boxShadow: "none",
          borderBottom: "solid 1px gray",
          backgroundColor: "#ffffff1a",
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <Button
            disableRipple
            sx={{
              borderBottom: "2px solid transparent",
              borderRadius: 0,
              transition: "border-bottom 0.3s ease",
              paddingBottom: "2px",
              "&:hover": {
                borderBottom: "2px solid white",
              },
            }}
          >
            <Typography variant="h5" component="div">
              <Link
                to="/dashboard"
                style={{
                  color: "white",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <img
                  alt="logo"
                  src="https://cdn-icons-png.flaticon.com/512/10003/10003660.png"
                  style={{ maxWidth: "32px", height: "auto" }}
                ></img>
                ccelerate
              </Link>
            </Typography>
          </Button>

          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <Button
                key={item.path}
                disableRipple
                sx={{
                  borderBottom: isActive
                    ? "3px solid white"
                    : "3px solid transparent",
                  borderRadius: 0,
                  paddingBottom: "4px",
                }}
              >
                <Link
                  to={item.path}
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontWeight: isActive ? "600" : "normal",
                  }}
                >
                  {item.label}
                </Link>
              </Button>
            );
          })}

          <ProfileDrawer />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
