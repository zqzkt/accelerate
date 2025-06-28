import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, CardHeader } from "@mui/material";
import supabase from "../helper/supabaseClient";
import NavigationBar from "../src/components/NavigationBar";
import { Link } from "react-router-dom";
import AllCoursesSummary from "../src/components/AllCoursesSummary";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getAllCourses = async () => {
      const { data, error } = await supabase.from("courses").select("*");

      if (error) {
        // console.log(error);
      }
      if (data) {
        setCourses(data);
        // console.log(data);
      }
    };

    getAllCourses();
  }, []);

  return (
    <div>
      <NavigationBar position="sticky" />

      <AllCoursesSummary/>
    </div>
  );
}
