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
            color: "white",
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
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {courses.map((course, index) => {
          return (
            <Link to={`/courses/${course.course_id}`} target="_blank">
              <Card
                variant="outlined"
                key={index}
                sx={{
                  backgroundColor: "#ffffff1a",
                  color: "white",
                  height: 220,
                  width: 200,
                  minWidth: 200,
                  maxWidth: 200,
                  marginRight: 2,
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  border: "1px solid #ffffff1a",
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: 6,
                    transform: "translateY(-2px) scale(1.02)",
                    backgroundColor: "#cae5ff",
                    color: "black",
                  },
                }}
              >
                <CardHeader
                  disableTypography
                  title={course.title}
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "700",
                    "&:hover": {
                      color: "black",
                    },
                  }}
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
