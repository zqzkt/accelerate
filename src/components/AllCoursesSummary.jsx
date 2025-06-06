import React, { useEffect, useState } from "react";
import { CardHeader } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Button } from "@mui/material";
import supabase from "../../helper/supabaseClient";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AllCoursesSummary() {
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

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
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .range(0, 5);

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
    <div style={{ margin: "20px" }}>
      {error}
      <h2>
        <Link
          to="/courses"
          style={{
            color: "black",
            textDecoration: "none",
            "&:hover": { textDecoration: "none" },
            "&:active": { textDecoration: "none" },
            "&:visited": { textDecoration: "none" },
            "&:focus": { textDecoration: "none" },
          }}
        >
          Explore
        </Link>
      </h2>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
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
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: "2px",
                outlineStyle: "solid",
                outlineColor: "#c5c3c9",
                cursor: "pointer",
                "&:hover": {
                  boxShadow: 6,
                  transform: "translateY(-4px) scale(1.03)",
                  borderColor: "gray",
                },
              }}
            >
              <CardHeader title={course.title} titleTypographyProps={{ fontSize: '1rem', fontWeight:"700" }}></CardHeader>
              <CardContent>{course.description}</CardContent>
            </Card>
            </Link>
          );
        })}
      </Box>
    </div>
  );
}
