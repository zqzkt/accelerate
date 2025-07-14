import React, { useState, useEffect } from "react";
import { CardHeader } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Button } from "@mui/material";
import ProgressBar from "./ProgressBar";
import supabase from "../../helper/supabaseClient";
import { Link } from "react-router-dom";

export default function CompletedCourses() {
  const [error, setError] = useState("");
  const [user, setUser] = useState("");
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("")

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
        .select(`course_id, progress, completed, courses (title)`)
        .eq("user_id", user)
        .eq("completed", true);

      if (error) {
        console.log(error);
      }
      if (data) {
        setCourses(data);
        // console.log(data);
        if (data.length == 0){
            setMessage("No completed courses for now :( Keep going!")
        }
      }
    };

    getUserCourses();
  }, [user]);

  return (
    <div style={{ margin: "20px" }}>
      <p>{error}</p>
      <h2>Completed</h2>
      <p>{message}</p>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        {courses.map((course, index) => {
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
              }}
            >
              <Box
                sx={{
                  filter: "grayscale(1)",
                  opacity: course.completed ? 0.5 : 1,
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CardHeader
                  title={course.courses.title}
                  disableTypography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: "700",
                    color: "white",
                  }}
                />

                <CardContent>
                  <Box sx={{ mb: 1 }}>
                    <ProgressBar progress={course.progress} />
                  </Box>
                  <Box>
                    <Link to={`/learn/${course.course_id}`} target="_blank">
                      <Button
                        fullWidth
                        variant="contained"
                        size="small"
                        sx={{
                          transition: "all 0.3s ease",
                          "&:hover": {
                            boxShadow: "0px 0px 8px 2px rgba(255,255,255,0.5)",
                            backgroundColor: "#a5d86e",
                            color: "black",
                          },
                        }}
                      >
                        View
                      </Button>
                    </Link>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          );
        })}
      </Box>
    </div>
  );
}
