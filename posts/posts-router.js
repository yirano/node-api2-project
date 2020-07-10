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
    res.status(500).json({ errorMessage: `Something went wrong: ${err}` })
  }
})



module.exports = router