import { useParams } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import supabase from "../../helper/supabaseClient";
import { react, useState, useEffect } from "react";
import { Box, Card, Button, CardContent } from "@mui/material";

const CourseDetail = () => {
  const { course_id } = useParams();
  console.log("course_id: ", course_id);

  const [course, setCourse] = useState("");
  const [modules, setModules] = useState([]);
  const [enrol, setEnrol] = useState(false);

  const handleEnrol = async () => {
    const { data, error } = await supabase
    .from('course_progress')
    .insert([{'user_id': 'user', 'course_id': course}])
    .select()

    if (data){
      setEnrol(true)
    }

    if (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    if (!course_id) return;

    const getCourse = async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("course_id", course_id);

      if (error) {
        console.log(error);
        return;
      }

      if (data) {
        setCourse(data[0]);
        // console.log(data);
      }
    };

    const getModules = async () => {
      const { data, error } = await supabase
        .from("modules")
        .select("*")
        .eq("course_id", course_id);

      if (error) {
        console.log(error);
        return;
      }
      if (data) {
        setModules(data);
        console.log(data);
      }
    };

    getCourse();
    getModules();
  }, [course_id]);

  return (
    <div>
      <NavigationBar />
      <Box sx={{ margin: "20px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h1 style={{ margin: 0 }}>
            <span>{course.title}</span>
          </h1>
          {enrol? (<Button onClick={() => handleEnrol()} variant="contained" size="large" color="success" sx={{marginLeft: "20px"}}>
            Enroll
          </Button>) : (<p>Enrolled</p>)}
        </Box>

        <p>{course.description}</p>
        <h2>Modules</h2>
      </Box>
      <Box>
        {modules.map((mod, index) => {
          return (
            <Card
              variant="outlined"
              key={index}
              sx={{
                marginLeft: 10,
                marginRight: 10,
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                outlineColor: "#c5c3c9",
                "&:hover": {
                  boxShadow: 6, // MUI shadow level
                  borderColor: "#c5c3c9",
                },
              }}
            >
              <Box
                sx={{
                  fontWeight: "medium",
                  fontSize: "medium",
                  paddingTop: "16px",
                  paddingBottom: "0px",
                  paddingLeft: "16px",
                }}
              >
                {mod.title}
              </Box>
              <CardContent sx={{ paddingTop: "6px" }}>
                {mod.description}
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </div>
  );
};

export default CourseDetail;
