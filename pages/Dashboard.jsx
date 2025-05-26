import React from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../helper/supabaseClient";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import ProfileDrawer from "../src/components/ProfileDrawer";
import InProgressCoursesSummary from "../src/components/InProgressCoursesSummary";
import AllCoursesSummary from "../src/components/AllCoursesSummary";

export default function Dashboard() {
  const navigate = useNavigate();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    navigate("/login");
  };

  // const email = useContext(UserContext);

  const getUserID = async() => {
    const {data: { user }, error} =
    await supabase.auth.getUser()
    

    if (error){
      console.log(error)
    }
    return user;
  };
  

  return (
      

    <div style={{}}>
        <ProfileDrawer/>
      <h1>Welcome to Accelerate!</h1>
      <Container sx={{backgroundColor:""}}>
        <InProgressCoursesSummary/>
        <AllCoursesSummary/>
        
        
      </Container>

      <Button onClick={signOut}>Sign out</Button>
    </div>
  );
};
