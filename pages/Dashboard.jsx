import React from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../helper/supabaseClient";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import InProgressCoursesSummary from "../src/components/InProgressCoursesSummary";
import AllCoursesSummary from "../src/components/AllCoursesSummary";
import NavigationBar from "../src/components/NavigationBar";

export default function Dashboard() {
  const navigate = useNavigate();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    navigate("/login");
  };
  
  return (
      

    <div>

      <NavigationBar position="sticky"/>
      
      
      <div>
      {/* <h1>Welcome to Accelerate!</h1> */}
      <Box>
        <InProgressCoursesSummary/>
        <AllCoursesSummary/>
        
        
      </Box>

      <Button onClick={signOut}>Sign out</Button>
    </div>
    </div>
  );
};
