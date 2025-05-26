import React, { useState, useEffect } from "react";
import { CardHeader } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ProgressBar from "./ProgressBar";
import supabase from "../../helper/supabaseClient";
// {title, progress} get from supabase

export default function InProgressCoursesSummary() {
  /* const title = "Introduction to Python"; */
  const [title, setTitle] = useState("");
  const [progress, setProgress] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getUserID = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.log(error);
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
      <p>{error}</p>
      <h2>My Courses</h2>
      {courses.map((course, index) => {
        return (
          <Card variant="outlined" key={index}>
            <CardHeader title={course.courses.title}></CardHeader>
            <CardContent>
              <ProgressBar progress={course.progress} />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
