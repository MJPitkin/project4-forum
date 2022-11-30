import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


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
        await fetch(`http://127.0.0.1:8000/boards/${boardId}/threads/`, {
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
    <div>CreateThreadPage
          <form><label>Post:<input type='text' value={newThread.title} onChange={(e) => setNewThread((oldState) => ({ ...oldState, title: e.target.value }))}></input></label>
              <button onClick={handleSubmit}>submit</button></form>
    </div>
  )
}

export default CreateThreadPage