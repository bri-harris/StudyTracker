import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../Home/Home';
import Team from '../Team/Team';
import SignIn from '../SignIn/SignIn';
import './App.css';

function App() {
    
  return (
    <BrowserRouter>  
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/team" exact element={<Team />} />
        <Route path="/signin" exact element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;