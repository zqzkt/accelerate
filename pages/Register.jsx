import React, { useState } from "react";
import supabase from "../helper/supabaseClient";
import { TextField, Box } from "@mui/material";
import Button from "@mui/material/Button";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    console.log(data, error)

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    if (data) {
      setMessage("Account successfully created!");
      setEmail("");
      setPassword("");
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        onSubmit={handleSubmit}
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
          onClick={() => setLoading(true)}
          loading={loading}
        >
          Register
        </Button>
      </Box>

      {message && <span>{message}</span>}
    </div>
  );
}
