import React, { useState, useEffect } from 'react';
import "./Pomodoro.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Pomodoro = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState('work'); // 'work' or 'break'

    useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);
        }

        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const startTimer = (selectedMode) => {
        const duration = selectedMode === 'work' ? 25 * 60 : 5 * 60;
        setMode(selectedMode);
        setTimeLeft(duration);
        setIsRunning(true);
    };

    const resetTimer = () => {
        const duration = mode === 'work' ? 25 * 60 : 5 * 60;
        setIsRunning(false);
        setTimeLeft(duration);
    };

    return (
        <div className="page-container">
            <Navbar />

            <div className="content-wrapper">

                <div className="description">
                    <div className="desc-header">Pomodoro Study Method</div>
                    <div className="desc-text">
                        This study method originated in the 1980s and is named after the iconic red, 
                        tomato-shaped kitchen timers that used to be a common kitchen item. These timers were
                        set to 25 minutes for a focus/work interval and 5 minutes for a break/refresh 
                        interval.
                    </div>
                </div>

                <div className="timer-container">
                    <div className="timer-box">
                        <h3>{mode === 'work' ? 'Work Timer (25 min)' : 'Break Timer (5 min)'}</h3>
                        <div className="timer-display">{formatTime(timeLeft)}</div>
                        <div className="timer-buttons">
                            <button onClick={() => startTimer('work')} disabled={isRunning && mode === 'work'}>
                                Start 25-min Work
                            </button>
                            <button onClick={() => startTimer('break')} disabled={isRunning && mode === 'break'}>
                                Start 5-min Break
                            </button>
                            <button onClick={resetTimer}>Reset</button>
                        </div>
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    );
};

export default Pomodoro;
