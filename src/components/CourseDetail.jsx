import { useParams } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import supabase from "../../helper/supabaseClient";
import { react, useState, useEffect } from "react";
import { Box, Card, Button, CardContent } from "@mui/material";

export default function CourseDetail() {
  const { course_id } = useParams();
  console.log("course_id: ", course_id);

  const [course, setCourse] = useState("");
  const [modules, setModules] = useState([]);
  const [enrol, setEnrol] = useState(false);
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const [showButton, setshowButton] = useState(true);

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
    if (!course_id || !user) return;

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
        console.log(data);
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

    const checkEnrol = async () => {
      const { data, error } = await supabase
        .from("course_progress")
        .select("*")
        .eq("user_id", user)
        .eq("course_id", course_id);

      if (data?.length > 0) {
        setEnrol(true);
        setshowButton(false);
      }

      if (error) {
        // setEnrol(false);
        console.log(error);
      }
    };

    getCourse();
    getModules();
    checkEnrol();
  }, [course_id, user]);

  const handleEnrol = async () => {
    const { data, error } = await supabase
      .from("course_progress")
      .insert([{ user_id: user, course_id: course_id }])
      .select();

    if (data) {
      setEnrol(true);
      setshowButton(false);
      modules.forEach((mod) => {
        handleModEnrol(mod)();
      });
    }

    if (error) {
      console.log(error);
    }
  };

  const handleModEnrol = (mod) => async () => {
    const { data, error } = await supabase
      .from("mod_progress")
      .insert([
        {
          mod_id: mod.mod_id,
          user_id: user,
          sequence: mod.sequence,
          course_id: course_id,
        },
      ])
      .select();

    if (data) {
      console.log(data);
    }

    if (error) {
      console.log(error);
      return;
    }
  };

  return (
    <div>
      <NavigationBar />
      <div style={{ marginLeft: "60px", marginRight: "60px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h1>{course.title}</h1>
          {showButton ? (
            <Button
              onClick={() => handleEnrol()}
              variant="contained"
              color="success"
              size="large"
              sx={{
                minWidth: "130px",
                transition: "all 0.3s ease",
                "&:hover": {
                  opacity: 0.7,
                },
              }}
            >
              Enrol
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              size="large"
              sx={{
                minWidth: "130px",
                transition: "all 0.3s ease",
                opacity: 0.5,
                pointerEvents: "none",
                marginLeft: "80px",
              }}
            >
              Enrolled
            </Button>
          )}
        </Box>

        <p>{course.description}</p>
        <h2>Modules</h2>
      </div>
      <Box>
        {modules.map((mod, index) => {
          return (
            <Card
              variant="outlined"
              key={index}
              sx={{
                color: "white",
                marginLeft: 10,
                marginRight: 10,
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: "1px solid #ffffff1a",
                backgroundColor: "#ffffff1a",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.15)",
                  borderColor: "#ffffff1a",
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
}
