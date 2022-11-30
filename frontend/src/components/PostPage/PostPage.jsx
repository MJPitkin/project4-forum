import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


function PostPage(user) {
    const navigate = useNavigate();
const {boardId, threadId} = useParams()
const [reply, setReply] = useState({
    author: user.user.sub,
    content: '',
    thread: threadId
})
console.log(reply);
async function handleSubmit(e) {
e.preventDefault();
    await fetch(`http://127.0.0.1:8000/boards/${boardId}/threads/${threadId}/posts/`, {
        method: "POST",
        mode: "cors",
        withCredentials: true,
        credentials: 'include',
        headers: new Headers({
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json" }),
        body: JSON.stringify(reply),
    }).catch(error => console.error(error))
    navigate(`/boards/${boardId}/threads/${threadId}`);
}
  return (
    <div>PostPage
          <form><label>Post:<textarea value={reply.content} onChange={(e) => setReply((oldState) => ({ ...oldState, content: e.target.value })) }></textarea></label>
            <button onClick={handleSubmit}>submit</button></form>
    </div>
  )
}

export default PostPage