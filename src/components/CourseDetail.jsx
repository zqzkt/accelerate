import { useParams } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import supabase from "../../helper/supabaseClient";
import {react, useState, useEffect } from "react"; 
const CourseDetail = () => {
  const { course_id } = useParams(); // e.g., "CS201"
  //console.log("course_id: ", course_id);

  const [course, setCourse] = useState("");

  useEffect(() => {
    const getCourse = async () => {
      const { data, error } = await supabase.from("courses").select("*").eq("course_id", course_id);

      if (error) {
        // console.log(error);
      }
      if (data) {
        setCourse(data[0]);
        // console.log(data);
      }
    };

    getCourse();
  }, []);

  // You could fetch data based on courseId or use static data
  // Example static course data
//   const courseData = {
//     CS201: {
//       title: "Data Structures",
//       description: "Learn about stacks, queues, trees, and graphs.",
//     },
//     CS101: {
//       title: "Intro to CS",
//       description: "Basics of programming and computer science.",
//     },
//   };

//   const course = courseData[course_id];

  if (!course) return <div>Course not found.</div>;
  console.log(course)
  return (
    <div>
      <NavigationBar />
      <h1>{course.title}</h1>
      <p>{course.description}</p>
    </div>
  );
};

export default CourseDetail;
