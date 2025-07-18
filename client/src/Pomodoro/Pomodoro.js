import React, { useState, useEffect } from 'react';
import "./Pomodoro.css";
import NavUser from "../NavUser/NavUser";
import Footer from "../Footer/Footer";

const Pomodoro = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState('work');
    
    const [workTime, setWorkTime] = useState(25 * 60);
    const [breakTime, setBreakTime] = useState(5 * 60);

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
        const duration = selectedMode === 'work' ? workTime : breakTime;
        setMode(selectedMode);
        setTimeLeft(duration);
        setIsRunning(true);
    };

    const resetTimer = () => {
        const duration = mode === 'work' ? workTime : breakTime;
        setIsRunning(false);
        setTimeLeft(duration);
    };

    const handleWorkTimeChange = (e) => {
        const newWorkTime = Math.max(e.target.value * 60, 60); 
        setWorkTime(newWorkTime);
        if (mode === 'work') setTimeLeft(newWorkTime);
    };

    const handleBreakTimeChange = (e) => {
        const newBreakTime = Math.max(e.target.value * 60, 60);
        setBreakTime(newBreakTime);
        if (mode === 'break') setTimeLeft(newBreakTime);
    };

    return (
        <div className="page-container">
            <NavUser />

            <div className="content-wrapper">

                <div className="description">
                    <div className="desc-header">Pomodoro Study Method</div>
                    <div className="desc-text">
                        This study method originated in the 1980s and is named after the iconic red, 
                        tomato-shaped kitchen timers that used to be a common kitchen item. These timers were
                        set to 25 minutes for a focus/work interval and 5 minutes for a break/refresh 
                        interval. Feel free to adjust the intervals to suit your goals! 
                    </div>
                </div>

                <div className="time-settings">
                    <div className="time-input">
                        <label>Work Time (min):</label>
                        <input 
                            type="number" 
                            value={workTime / 60} 
                            onChange={handleWorkTimeChange} 
                            min="1" 
                            disabled={isRunning}
                        />
                    </div>

                    <div className="time-input">
                        <label>Break Time (min):</label>
                        <input 
                            type="number" 
                            value={breakTime / 60} 
                            onChange={handleBreakTimeChange} 
                            min="1" 
                            disabled={isRunning}
                        />
                    </div>
                </div>

                <div className="timer-container">
                    <div className="timer-box">
                        <h3>{mode === 'work' ? `Work Timer` : `Break Timer`}</h3>
                        <div className="timer-display">{formatTime(timeLeft)}</div>
                        <div className="timer-buttons">
                            <button onClick={() => startTimer('work')} disabled={isRunning && mode === 'work'}>
                                Start Work
                            </button>
                            <button onClick={() => startTimer('break')} disabled={isRunning && mode === 'break'}>
                                Start Break
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
