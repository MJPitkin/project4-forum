import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './CreateThreadPage.css'


function CreateThreadPage(user) {
    const navigate = useNavigate();
    const {boardId} = useParams()
    const [newThread, setNewThread] = useState({
        author: user.user.sub,
        board: boardId,
        title: ''
    })

    async function handleSubmit(e) {
        e.preventDefault();
        await fetch(`https://project4-wallscrawl.herokuapp.com/boards/${boardId}/threads/`, {
            method: "POST",
            mode: "cors",
            withCredentials: true,
            credentials: 'include',
            headers: new Headers({
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(newThread),
        }).catch(error => console.error(error))
        navigate(`/boards/${boardId}/`);
    }

  return (
    <div className='createThread'><h3>Start a new thread</h3>
          <form className='createThreadForm'><label><span>Thread Title:</span><input type='text' value={newThread.title} onChange={(e) => setNewThread((oldState) => ({ ...oldState, title: e.target.value }))}></input></label>
              <button onClick={handleSubmit}>submit</button></form>
    </div>
  )
}

export default CreateThreadPage