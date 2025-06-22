import { useParams } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import supabase from "../../helper/supabaseClient";
import { react, useState, useEffect } from "react";
import { Box, Card, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const CourseProgressDetail = () => {
  const { course_id } = useParams();
  console.log("course_id: ", course_id);

  const [course, setCourse] = useState("");
  const [modules, setModules] = useState([]);
  const [checkButtons, setCheckButtons] = useState({});

  const handleCheck = (mod_id) => {
    setCheckButtons((prev) => ({
      ...prev,
      [mod_id]: true,
    }));

    const updateModules = async (mod_id) => {
      const { data, error } = await supabase
        .from("mod_progress")
        .update({ completed: true })
        .eq("mod_id", mod_id);
    };

    updateModules(mod_id);
  };

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
        <h1>{course.title}</h1>
        <p>{course.description}</p>
        <h2>Modules</h2>
      </Box>
      <Box>
        {modules.map((mod, index) => {
          return (
            <Card
              variant="outlined"
              key={mod.mod_id}
              sx={{
                marginLeft: 10,
                marginRight: 10,
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                justifyContent: "center",
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
                  display: "flex", // Make CardContent a flex container
                  justifyContent: "space-between", // Spread title and button
                  alignItems: "center",
                  padding: "16px",
                }}
              >
                {mod.title}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <div>&nbsp;</div>
                  {!checkButtons[mod.mod_id] ? (
                    <Box>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        sx={{
                          "&:hover": {
                            backgroundColor: "#9e9e9e",
                          },
                        }}
                      >
                        Take test to skip
                      </Button>
                      <Button
                        onClick={() => handleCheck(mod.mod_id)}
                        color="success"
                        size="small"
                        sx={{
                          "&:hover": {
                            backgroundColor: "#9e9e9e",
                          },
                        }}
                      >
                        <CheckCircleOutlineIcon />
                      </Button>
                    </Box>
                  ) : (
                    <Box display="flex" alignItems="center" gap={1}>
                      Completed
                      <CheckCircleIcon color="success" size="small" />
                    </Box>
                  )}
                </Box>
              </Box>
            </Card>
          );
        })}
      </Box>
    </div>
  );
};

export default CourseProgressDetail;
