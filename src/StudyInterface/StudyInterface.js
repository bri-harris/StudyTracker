import { useState, useRef, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "../Home/Home.css";
import "./StudyTracker.css";

const StudyTracker = () => {
    
    return (

        <div className="tracker-page-container">
            <Navbar />

            <div className="dashboard">
                <div className ="sidebar">
                    <div class="header">To-Do List</div>
                </div>

                <div className="middle-column">
                    <div className="image-container">
                        {/* You can insert an image later here */}
                    </div>
                    <div className="achievements-bar">
                        Achievements + Statistics
                    </div>
                </div>    

                <div className="widgets">

                <div class="widget">
                    <div class="header">Calendar</div>
                </div>

                <div class="widget">
                    <div class="header">Pomodoro</div>
                </div>
                
                
            </div>
            </div>

            <div class="main">
            </div>


            <Footer />

        </div>
    );
};

export default StudyTracker;