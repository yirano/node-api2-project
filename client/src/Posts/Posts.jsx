import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Axios from 'axios'

import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import styled from 'styled-components'

const StyledPosts = styled.div`
  padding: 2%;
`

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
    <Container maxWidth='md'>
      <Grid container spacing={5}>
        {posts.map(post => {
          return (
            <Grid item xs={4}>
              <h3>{post.title}</h3>
              <p>{post.created_at}</p>
              <p>{post.contents}</p>
              <IconButton aria-label="delete" color="primary">
                <DeleteIcon onClick={() => handleDelete(post.id)} />
              </IconButton>

            </Grid>
          )
        })}
      </Grid>
    </Container >
  )
}

export default Posts
