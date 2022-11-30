
import './App.css';
import React from 'react';
import { Route, Routes } from "react-router-dom"
import { useEffect, useState, createContext } from "react"
import LoginPage from './components/LoginPage/LoginPage';
import HomePage from "./components/HomePage/HomePage"
import BoardPage from './components/BoardPage/BoardPage'
import ThreadPage from './components/ThreadPage/ThreadPage'
import PostPage from './components/PostPage/PostPage';
import CreateThreadPage from './components/CreateThreadPage/CreateThreadPage';
import SignupPage from './components/SignupPage/SignupPage';
import UserService from './utils/userService';

const UserContext = createContext({ user: {}, setUser: () => { } })


function App() {
  const [user, setUser] = useState({});
  const value = { user, setUser }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const userData = UserService.getToken()
      setUser(userData)
    }
  }, [])
  return (
    <div className="App">
      {console.log("Or did I")}
      <UserContext.Provider value={value}>
        <Routes>
          <Route path='/login'
            element={<LoginPage user={user} setUser={setUser} />} />
          <Route path='/'
            element={<HomePage user={user} setUser={setUser} />} />
          <Route path='/boards/:boardId' element={<BoardPage user={user} />} />
          <Route path='/boards/:boardId/threads/:threadId' element={<ThreadPage user={user} />} />
          <Route path='/boards/:boardId/threads/:threadId/postform' element={<PostPage user={user} />} />
          <Route path='/boards/:boardId/threadform' element={<CreateThreadPage user={user} />} />
          <Route path='/signup' element={<SignupPage />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
