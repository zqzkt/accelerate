import React, { useState, useEffect } from "react";
import NavigationBar from "../src/components/NavigationBar";
import supabase from "../helper/supabaseClient";
import { Box, Card, CardHeader, CardContent, Button } from "@mui/material";
import ProgressBar from "../src/components/ProgressBar";
import InProgressCourses from "../src/components/InProgressCourses";
import CompletedCourses from "../src/components/CompletedCourses";

export default function MyProgress() {
  return (
    <div>
      <NavigationBar />
      <InProgressCourses />
      <CompletedCourses />
    </div>
  );
}
