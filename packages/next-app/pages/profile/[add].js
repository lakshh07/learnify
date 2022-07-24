import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Profile from "./Profile";

function index() {
  return (
    <div>
      <Navbar />
      <Profile />
      <Footer />
    </div>
  );
}

export default index;
