import { useState, useRef, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "../Home/Home.css";
import "./Team.css";

const Team = () => {

  return (
    <div className="about-page-container">
      <Navbar />

      <div className="credit-row-title">Team Members</div>
      <div className="credit-row">
        <a
          className="credit-cell"
          href="https://www.linkedin.com/in/alexandra-de-luera/"
    
          target="_blank"
        >
          <img className="img" src="headshot/Alex.png" alt="Alex Picture" />
          <div className="credit-name">Alex De Luera</div>
          <div className="credit-title">Project Manager</div>
        </a>

        <a
          className="credit-cell"
          href="https://www.linkedin.com/in/bri-harris/"
          target="_blank"
        >
          <img className="img" src="headshot/Bri.png" alt="Bri Picture" />
          <div className="credit-name">Bri Harris</div>
          <div className="credit-title">Scrum Master</div>
        </a>

        <a
          className="credit-cell"
          href="https://www.linkedin.com/in/aravind-ithikkat-024246150/"
          target="_blank"
        >
          <img className="img" src="headshot/Aravind.jpg" alt="Aravind Picture" />
          <div className="credit-name">Aravind Ithikkat</div>
          <div className="credit-title">Backend Developer</div>
        </a>

        <a
          className="credit-cell"
          href="https://www.linkedin.com/in/alyssa-williams-848878221/"
          target="_blank"
        >
          <img className="img" src="headshot/Alyssa.jpg" alt="Alyssa Picture" />
          <div className="credit-name">Alyssa Williams</div>
          <div className="credit-title">Frontend Developer</div>
        </a>
      </div>

      <div className="thankyou-box">
        <div className="credit-name">
          This project was created as part of the coursework for CEN3031: Intro to 
          Software Engineering at the University of Florida. While the titles shown
          above reflect the team members primary focus throughout the semester
          long assignment, the team collaborated fluidly on all aspects of the 
          development!
        </div>
      </div>

      <Footer />
  
    </div>
  );
};

export default Team;