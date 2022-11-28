
import './App.css';
import React from 'react';
import { Route, Routes } from "react-router-dom"
import { useEffect, useState } from "react"
import LoginPage from './components/LoginPage/LoginPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login'
          element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
