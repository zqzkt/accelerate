import React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  AddTask,
  ExitToApp,
  ManageAccounts,
  WorkspacePremium,
} from "@mui/icons-material";
import supabase from "../../helper/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function ProfileDrawer() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    navigate("/login");
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{ width: 250, backgroundColor: "#1a1a1a", color: "white" }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        {["Profile", "Edit Goals", "Achievements"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              sx={{
                color: "white",
                transition: "border-right 0.3s ease",
                "&:hover": {
                  borderRight: "4px solid white",
                },
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>
                {index == 0 ? (
                  <ManageAccounts />
                ) : index % 2 === 0 ? (
                  <WorkspacePremium />
                ) : (
                  <AddTask />
                )}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ color: "white" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={signOut}
            sx={{
              color: "white",
              "&:hover": {
                borderRight: "4px solid white",
              },
                transition: "border-right 0.3s ease",
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary="Sign Out" sx={{ color: "white" }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Button
        onClick={toggleDrawer(true)}
        disableRipple
        sx={{
          borderRight: "3px solid transparent",
          borderRadius: 0,
          transition: "border-right 0.3s ease",
          paddingBottom: "2px",
          "&:hover": {
            borderRight: "3px solid white",
          },
        }}
      >
        <Link
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          profile
        </Link>
      </Button>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "#1a1a1a",
              color: "white",
            },
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
