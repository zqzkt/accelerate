import React, { useState } from "react";
import supabase from "../helper/supabaseClient";
import { TextField, Box } from "@mui/material";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loadingButton, setloadingButton] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    //console.log(data, error);

    if (error) {
      setMessage(error.message);
      setEmail("");
      setPassword("");
      setloadingButton(false);
      return;
    }

    if (data) {
      navigate("/dashboard");
      return null;
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        bgcolor: "black",
        px: 2,
      }}
    >
      <div
        style={{
          backgroundColor: "#000",
          padding: "32px 40px",
          borderRadius: "12px",
          minWidth: "320px",
          maxWidth: "400px",
          color: "white",
          textAlign: "center",
          border: "1px solid #ffffff1a",
          backgroundColor: "#ffffff1a",
        }}
      >
        <h2 style={{ marginBottom: "24px", fontWeight: "600" }}>Login</h2>
        {message && (
          <span
            style={{
              display: "block",
              marginBottom: "16px",
              color: "white",
              fontWeight: "500",
            }}
          >
            {message}
          </span>
        )}
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
          onSubmit={(e) => {
            handleSubmit(e);
            setloadingButton(false);
          }}
        >
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            value={email}
            required
            variant="filled"
            InputProps={{
              sx: {
                bgcolor: "#ffffff1a",
                color: "white",
                borderRadius: 1,
                "&:hover": {
                  borderColor: "white",
                  bgcolor: "#ffffff33",
                },
                "& input::placeholder": {
                  color: "#ffffff99",
                },
              },
            }}
          />

          <TextField
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            value={password}
            required
            variant="filled"
            InputProps={{
              sx: {
                bgcolor: "#ffffff1a",
                color: "white",
                borderRadius: 1,
                "&:hover": {
                  borderColor: "white",
                  bgcolor: "#ffffff33",
                },
                "& input::placeholder": {
                  color: "#ffffff99",
                },
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            loading={loadingButton}
            sx={{
              mt: 1,
              border: "1px solid #ffffff1a",
              fontWeight: "600",
              textTransform: "none",
              bgcolor: "white",
              color: "black",
              borderColor: "white",
              "&:hover": {
                bgcolor: "#ffffff1a",
                color: "white",
                borderColor: "white",
              },
            }}
          >
            Login
          </Button>
        </Box>

        <div style={{ marginTop: "20px", fontSize: "0.9rem", color: "white" }}>
          <span>Don't have an account? </span>
          <Link
            to="/register"
            style={{
              color: "white",
              fontWeight: "600",
              textDecoration: "underline",
            }}
          >
            Register
          </Link>
        </div>
      </div>
    </Box>
  );
}
