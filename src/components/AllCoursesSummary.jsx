import React, { useEffect, useState } from "react";
import { CardHeader } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box } from "@mui/material";
import supabase from "../../helper/supabaseClient";

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
  }, [user]);

  return (
    <div>
      <h2>Explore</h2>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
        {courses.map((course, index) => {
          return (
            <Card
              variant="outlined"
              key={index}
              sx={{
                width: 200,
                minWidth: 200,
                maxWidth: 200,
                marginRight: 2, // spacing between cards
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
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
