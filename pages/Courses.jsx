import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, CardHeader } from "@mui/material";
import supabase from "../helper/supabaseClient";
import NavigationBar from "../src/components/NavigationBar";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getAllCourses = async () => {
      const { data, error } = await supabase.from("courses").select("*");

      if (error) {
        console.log(error);
      }
      if (data) {
        setCourses(data);
        console.log(data);
      }
    };

    getAllCourses();
  }, []);

  return (
    <div>
      <NavigationBar position="sticky"/>
      
      <Box sx={{ display: "flex", flexDirection: "row", gap: 1, marginTop: 2, marginLeft:'20px'}}>
        {courses.map((course, index) => {
          return (
            <Card
              variant="outlined"
              key={index}
              sx={{
                height:220,
                width: 200,
                minWidth: 200,
                maxWidth: 200,
                marginRight: 2,
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: "2px",
                outlineStyle: "solid",
                outlineColor: "#c5c3c9",
                "&:hover": {
                  boxShadow: 6, // MUI shadow level
                  transform: "translateY(-4px) scale(1.03)",
                  borderColor: "gray",
                },
              }}
            >
              <CardHeader title={course.title}></CardHeader>
              <CardContent>Learn More</CardContent>
            </Card>
          );
        })}
      </Box>
    </div>
  );
}
