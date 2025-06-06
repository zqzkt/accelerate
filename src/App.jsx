import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Wrapper from "../pages/Wrapper";
import Courses from "../pages/Courses";
import InProgressCourses from "../pages/InProgressCourses";
import Learn from "../pages/Learn";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          /* home */
        </Route>
        <Route path="/login" element={<Login />}>
          /* login */
        </Route>
        <Route path="/register" element={<Register />}>
          /* register */
        </Route>
        <Route
          path="/dashboard"
          element={
            <Wrapper>
              <Dashboard />
            </Wrapper>
          }
        >
          /* dashboard */
        </Route>
        <Route path="/courses" element={<Courses />}></Route>
        <Route path="/in_progress_courses" element={<InProgressCourses/>}></Route>
        <Route path="/learn" element={<Learn/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
