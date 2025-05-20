import React from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../helper/supabaseClient";
import Button from "@mui/material/Button";
import { Box, CardHeader, Container } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CoursesPreview from "../src/components/CoursesPreview";

export default function Dashboard() {
  const navigate = useNavigate();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    navigate("/login");
  };

  return (
    <div>
      <h1>Welcome to Accelerate!</h1>
      <Container sx={{backgroundColor:""}}>
        <h2>Dashboard</h2>

        <CoursesPreview/>
        
        
      </Container>

      <Button onClick={signOut}>Sign out</Button>
    </div>
  );
}
