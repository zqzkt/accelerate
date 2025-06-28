import { data, useParams } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import supabase from "../../helper/supabaseClient";
import { react, useState, useEffect } from "react";
import { Box, Card, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export default function CourseProgressDetail() {
  const { course_id } = useParams();
  console.log("course_id: ", course_id);

  const [course, setCourse] = useState("");
  const [modules, setModules] = useState([]);
  // const [sortedModules, setsortedModules] = useState([]);
  const [checkButtons, setCheckButtons] = useState({});
  const [user, setUser] = useState("");
  const [error, setError] = useState("");

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

  console.log("User: ", user);

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
        console.log(data[0]);
      }
    };

    const getModules = async () => {
      const { data, error } = await supabase
        .from("modules")
        .select(
          `
      *,
      mod_progress!inner(user_id, progress, completed, sequence)
    `
        )
        .eq("course_id", course_id)
        .eq("mod_progress.user_id", user);

      if (error) {
        console.log(error);
        return;
      }
      if (data) {
        setModules(
          data.sort(
            (a, b) => a.mod_progress[0].sequence - b.mod_progress[0].sequence
          )
        );
      }
    };

    getCourse();
    getModules();
  }, [course_id, user]);

  // useEffect(() => {
  //   if (!modules || modules.length === 0) return;

  //   setFirstNullProgressIndex(
  //     modules.findIndex((m) => m.mod_progress?.[0]?.progress === null)
  //   );

  //   setInProgressIndex(
  //     modules.findIndex(
  //       (m) =>
  //         m.mod_progress?.[0]?.progress >= 0 &&
  //         m.mod_progress?.[0]?.progress !== 100
  //     )
  //   );
  // }, [modules]);

  const handleCheck = (mod_id) => {
    setCheckButtons((prev) => ({
      ...prev,
      [mod_id]: true,
    }));

    const updateModules = async (mod_id) => {
      const { data, error } = await supabase
        .from("mod_progress")
        .update({ completed: true, progress: 100 })
        .eq("mod_id", mod_id)
        .eq("user_id", user);

      if (data) {
        console.log(data);
      }

      if (error) {
        console.log(error);
      }
    };

    updateModules(mod_id);
  };

  const updateProgress = async (mod_id) => {
    const { data, error } = await supabase
      .from("mod_progress")
      .update({ progress: 0 })
      .eq("mod_id", mod_id)
      .eq("user_id", user)
      .select();

    if (data) {
      console.log(data);
    }

    if (error) {
      console.log(error);
    }
  };

  const moveModule = async (cur_mod, cur_index, target_index) => {
    target_mod = modules[target_index];

    const cur_seq = cur_mod.sequence;
    const target_seq = target_mod.sequence;

    if (!target_mod) return;

    const [{ error: error1 }, { error: error2 }] = await Promise.all([
      supabase
        .from("modules")
        .update({ sequence: target_seq })
        .eq("mod_id", cur_mod)
        .select(),
      supabase
        .from("modules")
        .update({ sequence: cur_seq })
        .eq("mod_id", target_mod)
        .select(),
    ]);

    if (error1 || error2) {
      console.error("Failed to swap module sequences:", error1 || error2);
      return;
    }

    /* Update local modules */
    setModules((prev) => {
      prev.map((mod) => {
        if (mod.mod_id === cur_mod) {
          return {
            ...mod,
            mod_progress: [
              {
                ...mod.mod_progress,
                sequence: cur_seq,
              },
            ],
          };
        }

        if (mod.mod_id === target_mod) {
          return {
            ...mod,
            mod_progress: [
              {
                ...mod.mod_progress[0],
                sequence: target_seq,
              },
            ],
          };
        }

        return mod;
      });
    });
  };

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
          // console.log("Mod:", mod);
          const firstNullProgressIndex = modules.findIndex(
            (m) => m.mod_progress?.[0]?.progress === null
          );
          return (
            <Card
              variant="outlined"
              key={mod.mod_id}
              sx={{
                // color: "white",
                marginLeft: 10,
                marginRight: 10,
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                outlineColor: "white",
                backgroundColor: "transparent",
                "&:hover": {
                  boxShadow: 6,
                  borderColor: "white",
                },
              }}
            >
              <Box
                sx={{
                  fontWeight: "medium",
                  fontSize: "medium",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px",
                  backgroundColor: "black",
                  color: "white",
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
                  {!mod.mod_progress[0].completed &&
                  !checkButtons[mod.mod_id] ? (
                    <Box display="flex" gap={1}>
                      {index > 0 && (
                        <Button
                          size="small"
                          onClick={() => moveModule(mod, index, index - 1)}
                        >
                          <ArrowUpwardIcon />
                        </Button>
                      )}
                      {index < modules.length - 1 && (
                        <Button
                          size="small"
                          onClick={() => moveModule(mod, index, index + 1)}
                        >
                          <ArrowDownwardIcon />
                        </Button>
                      )}
                      {index === firstNullProgressIndex && (
                        <Button
                          onClick={() => updateProgress(mod.mod_id)}
                          variant="contained"
                          color="success"
                          size="small"
                          sx={{
                            "&:hover": {
                              backgroundColor: "#9e9e9e",
                            },
                          }}
                        >
                          start
                        </Button>
                      )}

                      <Button
                        onClick={() => handleCheck(mod.mod_id)}
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
}
