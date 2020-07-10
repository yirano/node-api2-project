import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Axios from 'axios'

const Posts = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8000/api/posts')
      .then(res => {
        setPosts(res.data.data)
      })
  }, [])

  const handleDelete = (id, e) => {

    Axios.delete(`http://localhost:8000/api/posts/${id}`)
      .then(res => {
        console.log(res)
        window.location.reload()
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <div>
      {posts.map(post => {
        return (
          <div>
            <h3>{post.title}</h3>
            <p>{post.created_at}</p>
            <p>{post.contents}</p>
            <button onClick={(e) => handleDelete(post.id, e)}>Delete Post</button>

          </div>
        )
      })}
    </div>
  )
}

export default Posts
