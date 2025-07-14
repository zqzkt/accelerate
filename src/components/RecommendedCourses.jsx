import React, { useEffect, useState } from "react";
import supabase from "../../helper/supabaseClient";
import { CardHeader } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function RecommendedCourses() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const [courses, setCourses] = useState([]);
  const [allCourses, setallCourses] = useState([]);
  const [asked, setAsked] = useState(false);

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

    const getAllCourses = async () => {
      const { data, error } = await supabase.from("courses").select("*");

      if (error) {
        console.log(error);
      }

      if (data) {
        console.log(data);
        setallCourses(data);
      }
    };

    getAllCourses();
  }, [user]);

  const handleRecommend = async () => {
    setLoading(true);
    setAsked(true);
    const res = await fetch("/.netlify/functions/recommender", {
      method: "POST",
      body: JSON.stringify({
        courses,
        allCourses,
      }),
    });

    const data = await res.json();
    setRecommendations(data);
    console.log(data);

    if (data) {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginLeft: "20px", color: "white" }}>
      <h2>Recommended Courses</h2>
      <Button
        variant="contained"
        onClick={handleRecommend}
        sx={{
          border: "1px solid #ffffff1a",
          bgcolor: "white",
          color: "black",
          transition: "all 0.3s ease",
          "&:hover": {
            opacity: 0.7,
          },
        }}
      >
        Get Recommendations
      </Button>

      {loading && (
        <p
          style={{ marginTop: "8px", fontStyle: "italic", color: "#ffffffcc" }}
        >
          Loading...
        </p>
      )}

      {Array.isArray(recommendations) && recommendations.length > 0 ? (
        <div style={{ display: "flex", marginTop: "24px" }}>
          {recommendations.map((rec, index) => (
            <Link to={`/courses/${rec.course_id}`} target="_blank" key={index}>
              <Card
                variant="outlined"
                sx={{
                  backgroundColor: "#ffffff1a",
                  color: "white",
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
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.15)",
                    transform: "scale(1.02)",
                  },
                }}
              >
                <CardHeader
                  disableTypography
                  title={rec.title}
                  sx={{ fontSize: "1rem", fontWeight: "700" }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      fontSize: "0.9rem",
                      lineHeight: 1.5,
                      fontWeight: "normal",
                    }}
                  >
                    {rec.description}
                  </Box>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        ""
      )}
      {!Array.isArray(recommendations) && !recommendations.length > 0 ? (
        <p style={{ marginTop: "24px" }}>No recommendations available.</p>
      ) : (
        ""
      )}
    </div>
  );
}
