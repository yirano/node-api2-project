import React from 'react'
import { useState } from 'react'
import Axios from 'axios'
import styled from 'styled-components'

import Button from '@material-ui/core/Button'

const Blog = () => {
  const [post, setPost] = useState({})
  const handleSubmit = e => {
    Axios.post('http://localhost:8000/api/posts', post)
      .then(res => {
        console.log(res)
      })
  }

  const handleChange = e => {
    setPost({ ...post, [e.target.name]: e.target.value })
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type='text' name='title' value={post.title} onChange={e => handleChange(e)} />
      <input type='text' name='contents' value={post.contents} onChange={e => handleChange(e)} />
      <Button onClick={handleSubmit}>Submit</Button>
    </form>
  )
}

export default Blog
