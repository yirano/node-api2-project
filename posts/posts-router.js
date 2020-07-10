const express = require('express')

const db = require('../data/db')

const router = express.Router()

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