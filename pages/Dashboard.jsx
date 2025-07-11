import React from "react";
import supabase from "../helper/supabaseClient";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import InProgressCourses from "../src/components/InProgressCourses";
import AllCoursesSummary from "../src/components/AllCoursesSummary";
import NavigationBar from "../src/components/NavigationBar";
import RecommendedCourses from "../src/components/RecommendedCourses";

export default function Dashboard() {

  return (
    <div>
      <NavigationBar position="sticky" />

      <div>
        <Box>
          <InProgressCourses />
          <RecommendedCourses />
          <AllCoursesSummary />
        </Box>
      </div>
    </div>
  );
}
