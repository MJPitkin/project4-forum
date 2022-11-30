
import './App.css';
import React from 'react';
import { Route, Routes } from "react-router-dom"
import { useEffect, useState, createContext } from "react"
import LoginPage from './components/LoginPage/LoginPage';
import HomePage from "./components/HomePage/HomePage"
import BoardPage from './components/BoardPage/BoardPage'

const UserContext = createContext({ user: {}, setUser: () => { } })


function App() {
  const [user, setUser] = useState({});
  const value = { user, setUser }
  return (
    <div className="App">
      <UserContext.Provider value={value}>
        <Routes>
          <Route path='/login'
            element={<LoginPage user={user} setUser={setUser} />} />
          <Route path='/'
            element={<HomePage user={user} setUser={setUser} />} />
          <Route path='/boards/:id' element={<BoardPage user={user} />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
