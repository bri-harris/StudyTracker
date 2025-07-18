import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';
import Team from '../Team/Team';
import SignIn from '../SignIn/SignIn';
import Register from '../Register/Register';
import Study from '../StudyInterface/StudyInterface';
import Pomodoro from '../Pomodoro/Pomodoro';
import Admin from '../Admin/Admin';
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/team" exact element={<Team />} />
        <Route path="/signin" exact element={<SignIn />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/study" exact element={<Study />} />
        <Route path="/pomodoro" exact element={<Pomodoro />} />
        <Route path="/admin" exact element={<Admin />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;