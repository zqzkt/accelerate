import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, CardHeader } from "@mui/material";
import supabase from "../helper/supabaseClient";
import NavigationBar from "../src/components/NavigationBar";
import { Link } from "react-router-dom";

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

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap", 
          flexDirection: "row",
          gap: 1,
          marginTop: 2,
          marginLeft: "20px",
        }}
      >
        {courses.map((course, index) => {
          return (
            <Link to={`/courses/${course.course_id}`} target="_blank">
              <Card
                variant="outlined"
                key={index}
                sx={{
                  height: 220,
                  width: 200,
                  minWidth: 200,
                  maxWidth: 200,
                  marginRight: 2,
                  marginBottom: 2, 
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  border: "2px",
                  outlineStyle: "solid",
                  outlineColor: "#c5c3c9",
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: 6, // MUI shadow level
                    transform: "translateY(-4px) scale(1.03)",
                    borderColor: "gray",
                  },
                }}
              >
                <CardHeader
                  disableTypography
                  title={course.title}
                  Typography={{ fontSize: "1rem", fontWeight: "700" }}
                ></CardHeader>
                <CardContent>
                  <Box
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      fontSize: "0.9rem",
                      lineHeight: 1.5,
                      color: "text.secondary",
                      fontWeight: "normal",
                    }}
                  >
                    {course.description}
                  </Box>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </Box>
    </div>
  );
}
