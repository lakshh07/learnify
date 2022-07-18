import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewQuest from "./components/NewQuest";

function newQuest() {
  return (
    <>
      <Navbar />
      <NewQuest />
      <Footer />
    </>
  );
}

export default newQuest;
