import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Posts = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8000/api/posts')
      .then(res => {
        setPosts(res.data.data)
      })
  }, [])
  console.log(posts)
  return (
    <div>
      {posts.map(post => {
        return (
          <div>
            <h3>{post.title}</h3>
            <p>{post.created_at}</p>
            <p>{post.contents}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Posts
