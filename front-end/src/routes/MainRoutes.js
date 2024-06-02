import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "../pages/main";
import SignUp from "../pages/signup";
import Login from "../pages/login";
import Profile from "../pages/profil";
import { Admin } from "../pages/admin";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/main" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
};

export default MainRoutes;
