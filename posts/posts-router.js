const express = require('express')

const db = require('../data/db')

const router = express.Router()

router.post('/', async (req, res) => {
  const blogPost = req.body
  try {
    if (blogPost.title && blogPost.contents) {
      const posted = await db.insert(blogPost)
      if (posted) {
        res.status(201).json({ data: posted })
      } else {
        res.status(404).json({ errorMessage: 'The post could not be posted' })
      }
    } else {
      res.status(400).json({ errorMessage: 'The server could not understand the request due to invalid syntax.' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ errorMessage: 'Something went wrong' })
  }
})


// ! SQLite Error
router.post('/:id/comments', async (req, res) => {
  const id = req.params.id
  const text = req.body.text
  try {
    if (text) {
      const posts = await db.findById(id)
      if (posts) {
        const postedComment = await db.insertComment(text)
        res.status(201).json(postedComment)
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' })
      }
    } else {
      res.status(400).json({ errorMessage: 'Please provide text for the comment.' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ errorMessage: 'There was an error while saving the comment to the database.' })
  }
})

router.get('/', async (req, res) => {
  const posts = await db.find()

  try {
    if (posts) {
      res.status(200).json({ data: posts })
    } else {
      res.status(404).json({ errorMessage: 'Could not retrieve posts' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ errorMessage: `Server error: ${err}` })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const post = await db.findById(id)

  try {
    if (post) {
      res.status(200).json({ data: post })
    } else {
      res.status(404).json({ message: 'The post with the specified ID does not exist.' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'The post information could not be retrieved.' })
  }
})

router.get('/:id/comments', async (req, res) => {
  const id = req.params.id
  const posts = await db.findById(id)

  try {
    if (posts) {
      const comments = await db.findPostComments(id)
      if (comments) {
        res.status(200).json({ data: comments })
      }
    } else {
      res.status(404).json({ errorMessage: 'The post requested cannot be found' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ errorMessage: `Server error: ${err}` })
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const post = await db.findById(id)

  try {
    if (post) {
      const deleted = await db.remove(id)
      res.status(200).json({ message: 'Delete successful' })
    } else {
      res.status(404).json({ message: 'The post with the specified ID does not exist.' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'The post could not be removed.' })
  }
})

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const post = await db.findById(id)
  const { title, contents } = req.body
  const editPost = req.body

  try {
    if (post) {
      if (editPost.title && editPost.contents) {
        const edited = await db.update(id, editPost)
        res.status(200).json(edited)
      } else {
        res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' })
      }
    } else {
      res.status(404).json({ message: 'The post with the specified ID does not exist.' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'The post information could not be modified.' })
  }
})

module.exports = router