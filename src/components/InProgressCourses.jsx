import React, { useState, useEffect } from "react";
import { CardHeader } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Button } from "@mui/material";
import ProgressBar from "./ProgressBar";
import supabase from "../../helper/supabaseClient";
import { Link } from "react-router-dom";

export default function InProgressCourses() {
  const [error, setError] = useState("");
  const [user, setUser] = useState("");
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

    const getUserCourses = async () => {
      const { data, error } = await supabase
        .from("course_progress")
        .select(`course_id, progress, courses (title)`)
        .eq("user_id", user);

      if (error) {
        console.log(error);
      }
      if (data) {
        setCourses(data);
        console.log(data);
      }
    };

    getUserCourses();
  }, [user]);

  return (
    <div style={{ margin: "20px" }}>
      <p>{error}</p>
      <h2>
        <Link
          to="/in_progress_courses"
          style={{
            textDecoration: "none",
            "&:hover": { textDecoration: "none" },
            "&:active": { textDecoration: "none" },
            "&:visited": { textDecoration: "none" },
            "&:focus": { textDecoration: "none" },
          }}
        >
          My Courses
        </Link>
      </h2>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {courses.map((course, index) => {
          console.log("Progress:", course.progress);
          return (
            <Card
              variant="outlined"
              key={index}
              sx={{
                color: "white",
                backgroundColor: "#ffffff1a",
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
                position: "relative",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.15)",
                  transform: "scale(1.02)",
                },

                // "&:before": {
                //   background:
                //     "radial-gradient(800px circle at 200px 100px #43ff640f transparent 40%)",
                // },
              }}
            >
              <CardHeader
                title={course.courses.title}
                disableTypography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "700",
                  // "&:hover": {
                  //   color: "black",
                  // },
                }}
              ></CardHeader>
              <CardContent>
                <ProgressBar progress={course.progress} />
                <Link to={`/learn/${course.course_id}`} target="_blank">
                  {Number(course.progress || 0) == 0 ? (
                    <Button variant="contained" color="success">
                      start
                    </Button>
                  ) : (
                    <Button variant="contained" color="secondary">
                      Resume
                    </Button>
                  )}
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </div>
  );
}
