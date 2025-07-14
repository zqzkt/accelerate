import { data, useParams } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import supabase from "../../helper/supabaseClient";
import { react, useState, useEffect } from "react";
import { Box, Card, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import ProgressBar from "./ProgressBar";
import videoPlayerScreenshot from "../assets/video_player_screenshot.png";

export default function CourseProgressDetail() {
  const { course_id } = useParams();
  const [course, setCourse] = useState("");
  const [modules, setModules] = useState([]);
  const [checkButtons, setCheckButtons] = useState({});
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [openModalIndex, setopenModalIndex] = useState(null);
  const handleOpen = (index) => setopenModalIndex(index);
  const handleClose = () => setopenModalIndex(null);

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
        .from("course_progress")
        .select(
          `*,
      courses (*)  -- join all columns from courses table
    `
        )
        .eq("course_id", course_id)
        .eq("user_id", user);

      if (error) {
        console.error(error);
        return;
      }

      if (data) {
        setCourse(data[0]);
        console.log(data[0]);
      }
    };

    getCourse();
    getModules();
  }, [course_id, user]);

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
      console.error(error);
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

  const handleCheck = async (mod_id) => {
    setCheckButtons((prev) => ({
      ...prev,
      [mod_id]: true,
    }));

    const updateModules = async (mod_id) => {
      const { data, error } = await supabase
        .from("mod_progress")
        .update({ completed: true, progress: 100 })
        .eq("mod_id", mod_id)
        .eq("user_id", user)
        .select();

      if (data) {
        console.log("Sucessfully updated module progress.");
        await checkProgress();
      }

      if (error) {
        console.error(error);
      }

      await getModules();
    };

    const checkProgress = async () => {
      const { data, error } = await supabase
        .from("course_progress")
        .select(
          `
      *,
      mod_progress!inner(user_id, completed)
    `
        )
        .eq("course_id", course_id)
        .eq("mod_progress.user_id", user)
        .eq("mod_progress.completed", true);

      if (data) {
        console.log("Course data: ", data);
        const newProgress = data[0].mod_progress.length / modules.length;
        console.log(data[0].mod_progress.length, modules.length, newProgress);
        console.log(`Successfully checked course progress: ${newProgress}`);

        await updateProgress(newProgress);
      }
      if (error) {
        console.error(error);
      }
    };

    const updateProgress = async (newProgress) => {
      if (newProgress == 1) {
        const { data, error } = await supabase
          .from("course_progress")
          .update({ completed: true, progress: newProgress * 100 })
          .eq("user_id", user)
          .eq("course_id", course_id)
          .select();

        console.log("data:", data);
        console.log("error:", error);

        if (data) {
          console.log(
            "Successfully updated course progress. Course completed."
          );
          setCourse((prev) => ({
            ...prev,
            progress: newProgress * 100,
            completed: true,
          }));
        }
        if (error) {
          console.error(error);
        }
      } else {
        const { data, error } = await supabase
          .from("course_progress")
          .update({ progress: newProgress * 100 })
          .eq("user_id", user)
          .eq("course_id", course_id)
          .select("*");

        if (data) {
          console.log("Successfully updated course progress");
          setCourse((prev) => ({
            ...prev,
            progress: newProgress * 100,
          }));
        }
        if (error) {
          console.error(error);
        }
      }
    };

    await updateModules(mod_id);
  };

  const startModule = async (mod_id) => {
    handleOpen();
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
      console.error(error);
    }

    await getModules();
  };

  const moveModule = async (cur_mod, cur_index, target_index) => {
    const target_mod = modules[target_index];

    const cur_seq = cur_mod.mod_progress[0].sequence;
    const target_seq = target_mod.mod_progress[0].sequence;

    if (!target_mod) return;

    const [{ error: error1 }, { error: error2 }] = await Promise.all([
      supabase
        .from("mod_progress")
        .update({ sequence: target_seq })
        .eq("mod_id", cur_mod.mod_id)
        .eq("user_id", user)
        .select(),
      supabase
        .from("mod_progress")
        .update({ sequence: cur_seq })
        .eq("mod_id", target_mod.mod_id)
        .eq("user_id", user)
        .select(),
    ]);

    if (error1 || error2) {
      console.error("Failed to swap module sequences:", error1 || error2);
    } else console.log("Successfully swapped.");

    /* Update local modules */
    setModules((prev) =>
      prev
        .map((mod) => {
          if (mod.mod_id === cur_mod.mod_id) {
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

          if (mod.mod_id === target_mod.mod_id) {
            return {
              ...mod,
              mod_progress: [
                {
                  ...mod.mod_progress[0],
                  sequence: cur_seq,
                },
              ],
            };
          }
          return mod;
        })
        .sort((a, b) => a.mod_progress[0].sequence - b.mod_progress[0].sequence)
    );
  };

  return (
    <div>
      <NavigationBar />
      <div>
        {course?.courses && (
          <Box sx={{ marginLeft: "60px", marginRight: "60px" }}>
            <h1>{course.courses.title}</h1>
            <p>{course.courses.description}</p>
          </Box>
        )}

        <Box
          sx={{
            marginLeft: "60px",
            marginRight: "60px",
            marginTop: "-10px",
            maxWidth: "calc(100% - 40px)",
          }}
        >
          <ProgressBar progress={course?.progress} />
        </Box>
        <Box sx={{ marginLeft: "60px", marginRight: "60px" }}>
          <h2>Modules</h2>
        </Box>
      </div>

      <Box>
        {modules.map((mod, index) => {
          const firstNotCompletedIndex = modules.findIndex(
            (m) => !m.mod_progress?.[0]?.completed
          );
          return (
            <Card
              variant="outlined"
              key={mod.mod_id}
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
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "left",
                  padding: "16px",
                  backgroundColor: "#ffffff05",
                  color: "white",
                  borderRadius: "10px",
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
                      {index === firstNotCompletedIndex && (
                        <>
                          {mod.mod_progress[0].progress === null &&
                            !mod.mod_progress[0].completed && (
                              <Button
                                onClick={() => {
                                  startModule(mod.mod_id);
                                  handleOpen(index);
                                }}
                                variant="contained"
                                color="success"
                                size="small"
                                sx={{
                                  transition: "all 0.3s ease",
                                  "&:hover": { backgroundColor: "#9e9e9e" },
                                }}
                              >
                                Start
                              </Button>
                            )}
                          {mod.mod_progress[0].progress !== null &&
                            mod.mod_progress[0].progress < 100 &&
                            !mod.mod_progress[0].completed && (
                              <Button
                                onClick={() => handleOpen(index)}
                                variant="contained"
                                size="small"
                                sx={{
                                  backgroundColor: "#5a23b1",
                                  transition: "all 0.3s ease",
                                  "&:hover": {
                                    opacity: 0.7,
                                  },
                                }}
                              >
                                Resume
                              </Button>
                            )}
                        </>
                      )}

                      <Modal
                        open={openModalIndex === index}
                        onClose={handleClose}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          px: 3,
                        }}
                      >
                        <Box
                          sx={{
                            width: "80vw",
                            maxWidth: "900px",
                            bgcolor: "#1a1a1a",
                            border: "1px solid #ffffff1a",
                            borderRadius: "8px",
                            boxSizing: "border-box",
                            p: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            maxHeight: "90vh",
                            overflowY: "auto",
                            position: "relative",
                          }}
                        >
                          <IconButton
                            onClick={handleClose}
                            sx={{
                              position: "absolute",
                              top: 16,
                              right: 16,
                              color: "white",
                              zIndex: 1,
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <h2
                              style={{
                                color: "white",
                                mb: "16px",
                                alignSelf: "flex-start",
                              }}
                            >
                              {mod.title}
                            </h2>
                            <img
                              src={videoPlayerScreenshot}
                              alt="Video preview"
                              style={{
                                width: "100%",
                                maxHeight: "65vh",
                                borderRadius: "10px",
                                objectFit: "contain",
                              }}
                            />
                          </Box>

                          <Box
                            sx={{
                              width: "100%",
                              mt: 2,
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Button
                              onClick={() => handleCheck(mod.mod_id)}
                              color="success"
                              variant="contained"
                              sx={{
                                px: 3,
                                py: 1.5,
                                fontWeight: 600,
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  opacity: 0.7,
                                },
                              }}
                            >
                              mark as completed
                            </Button>
                          </Box>
                        </Box>
                      </Modal>

                      <Button
                        onClick={() => handleCheck(mod.mod_id)}
                        variant="contained"
                        size="small"
                        sx={{
                          backgroundColor: "	#B45309",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            opacity: 0.5,
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
