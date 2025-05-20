import React, { useState } from "react";
import supabase from "../helper/supabaseClient";
import { TextField, Box } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loadingButton, setloadingButton] = useState(false);

  const handleSubmit = async (event) => {
    console.log("Processing event");
    event.preventDefault();
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    console.log(data, error);

    if (error) {
      setMessage(error.message);
      setloadingButton(false);
      return;
    }

    if (data) {
      setMessage("Account successfully created!");
      setEmail("");
      setPassword("");
      setloadingButton(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>
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
          Register
        </Button>
      </Box>
      <span>Already have an account?</span>
      <Link to="/login">Log in</Link>
    </div>
  );
}
