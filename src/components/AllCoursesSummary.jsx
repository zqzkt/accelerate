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
      }
    };

    getUserID();
  }, []);

  useEffect(() => {
    if (!user) return;

    const getAllCourses = async () => {
      const { data: allCourses, error } = await supabase
        .from("courses")
        .select("*");

      if (error) {
        console.log(error);
      }

      const { data: enrolledCourses, error: enrolledCoursesError } =
        await supabase
          .from("course_progress")
          .select("course_id")
          .eq("user_id", user);

      if (enrolledCoursesError) {
        console.error("Error fetching enrolled courses:", enrolledCoursesError);
        return;
      }

      const enrolledCourseIds = enrolledCourses.map((item) => item.course_id);
      // console.log(enrolledCourseIds);

      // Step 3: Filter courses that are NOT enrolled
      const notEnrolledCourses = allCourses.filter(
        (course) => !enrolledCourseIds.includes(course.course_id)
      );
      // console.log(notEnrolledCourses);

      setCourses(notEnrolledCourses);
    };

    getAllCourses();
    // console.log(courses);
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
            <Link
              to={`/courses/${course.course_id}`}
              target="_blank"
              key={course.course_id}
            >
              <Card
                variant="outlined"
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
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.15)",
                    transform: "scale(1.02)",
                  },
                }}
              >
                <CardHeader
                  disableTypography
                  title={course.title}
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "700",
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
