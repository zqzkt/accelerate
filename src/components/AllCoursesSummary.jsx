import React, { useEffect, useState } from "react";
import { CardHeader } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/material";
import supabase from "../../helper/supabaseClient";
import { Link } from "react-router-dom";

export default function AllCoursesSummary() {
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getUserID = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.log(error);
        setError(error);
      }
      if (data) {
        setUser(data.user.id);
        // console.log(user)
      }
    };

    getUserID();
  }, []);

  useEffect(() => {
    if (!user) return;

    const getAllCourses = async () => {
      const { data, error } = await supabase.from("courses")
      .select("*")
      .range(0, 5)

      if (error) {
        console.log(error);
      }
      if (data) {
        setCourses(data);
        console.log(data);
      }
    };

    getAllCourses();
  }, [user]);

  return (
    <div style={{margin:'20px'}}>
      {error}
      <h2><Link to="/courses" style={{
        color:"black",
      textDecoration: "none",
      "&:hover": { textDecoration: "none" },
      "&:active": { textDecoration: "none" },
      "&:visited": { textDecoration: "none" },
      "&:focus": { textDecoration: "none" }
    }}>Explore</Link></h2>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
        {courses.map((course, index) => {
          return (
            <Card
              variant="outlined"
              key={index}
              sx={{
                height: 220,
                width: 200,
                minWidth: 200,
                maxWidth: 200,
                marginRight: 2, // spacing between cards
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: "2px",
                outlineStyle: "solid",
                outlineColor:"#c5c3c9",
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
