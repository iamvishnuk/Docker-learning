const mongoose = require('mongoose')
const express = require('express');
const app = express();

const Post = require('./models/postModel');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require('./config/config');

// define the prot
const PORT = process.env.PORT || 3000
const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/test?authSource=admin`

// defining middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// connecting to mongodb server
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to mongodb server 🟢'))
  .catch((err) => console.log('Failed to connect to mongodb server ❌', err))




app.get('/', (req, res) =>  {
  res.status(200).json({
    status: 'success',
    message: 'successfully get'
  })
})

app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find()
    res.status(200).json({
      status: 'success',
      message: 'Posts successfully get',
      data: posts
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 'failed',
      message: 'Something went wrong'
    })
  }
})

app.post('/posts', async (req, res) => {
  try {
    const post = await Post.create(req.body)
    res.status(200).json({
      status: 'success',
      message: 'Post create successfully',
      data: post
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 'failed',
      message: 'Something went wrong'
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT} 🚀🚀`)
})