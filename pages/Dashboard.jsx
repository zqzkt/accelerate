import React from "react";
import supabase from "../helper/supabaseClient";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import InProgressCoursesSummary from "../src/components/InProgressCoursesSummary";
import AllCoursesSummary from "../src/components/AllCoursesSummary";
import NavigationBar from "../src/components/NavigationBar";

export default function Dashboard() {
  

  
  
  return (
      

    <div>

      <NavigationBar position="sticky"/>
      
      
      <div>
      {/* <h1>Welcome to Accelerate!</h1> */}
      <Box>
        <InProgressCoursesSummary/>
        <AllCoursesSummary/>
        
        
      </Box>

      
    </div>
    </div>
  );
};
