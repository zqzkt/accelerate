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
      }}
    >
      <div>
        <h2>Login</h2>
        {message && <span>{message}</span>}
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
          onSubmit={(e) => {
            handleSubmit(e);
            setloadingButton(false);
          }}
        >
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email"
            value={email}
            required
          />

          <TextField
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            placeholder="Password"
            value={password}
            required
          />
          <br></br>
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "black" }}
            size="large"
            loading={loadingButton}
          >
            Login
          </Button>
        </Box>
        <span>Don't have an account?</span>
        <Link to="/register">Register</Link>
      </div>
    </Box>
  );
}
