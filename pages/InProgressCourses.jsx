import React, { useState, useEffect } from "react";
import NavigationBar from "../src/components/NavigationBar";
import supabase from "../helper/supabaseClient";
import { Box, Card, CardHeader, CardContent,Button } from "@mui/material";
import ProgressBar from "../src/components/ProgressBar";

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
    <div>
      {error}
      <NavigationBar />
      <Box sx={{ display: "flex", flexDirection: "row", gap: 1, marginTop: 2, marginLeft: "20px"}}>
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
                outlineColor: "#c5c3c9",
                "&:hover": {
                  boxShadow: 6, // MUI shadow level
                  transform: "translateY(-4px) scale(1.03)",
                  borderColor: "gray",
                },
              }}
            >
              <CardHeader slotProps={{title: {variant:'h6' }}} title={course.courses.title} titleTypographyProps={{ fontSize: '1rem' }}></CardHeader>
              <CardContent>
                <ProgressBar progress={course.progress} />
                <Button variant="contained" color="secondary">
                  Resume
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </div>
  );
}
