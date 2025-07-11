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
    <div>
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "black",
          width: "100vw",
        }}
      >
        <AppBar
          sx={{
            position: "fixed",
            top: 0,
            width: "100%",
            borderBottom: "solid 1px #ffffff1a",
            backgroundColor: "#1a1a1a",
          }}
        >
          <Toolbar sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Box
              sx={{
                display: "flex",
                flexGrow: 1,
                alignItems: "center",
                gap: 2,
              }}
            >
              <Button
                disableRipple
                sx={{
                  borderBottom: "3px solid transparent",
                  borderRadius: 0,
                  marginTop: "9px",
                  transition: "border-bottom 0.3s ease",
                  "&:hover": {
                    borderBottom: "3px solid white",
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
                      style={{
                        maxWidth: "32px",
                        height: "auto",
                        verticalAlign: "middle",
                      }}
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
              <Box sx={{ ml: "auto" }}>
                <ProfileDrawer />
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ mt: "80px" }}>{/* Your page content goes here */}</Box>
    </div>
  );
}
