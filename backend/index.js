// Import packages
const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const bcrypt = require('bcrypt')

// In-memory database
const users = [
  {
    username: 'admin',
    password: '$2a$12$SmjLks347NjZ9OLbixbVouoa5sPhqIek9L7kDo3rnInri/SFvJH.6' // admin12345
  }
]

// Set up CORS policy options
const corsOptions = {
  origin: 'http://localhost:5173', // your frontend url
  credentials: true, // important for cookies
  optionsSuccessStatus: 200 // for older browser support
}

// Set up middlewares
app.use(cors(corsOptions)) // cors policy options
app.use(express.json()) // for receiving and sending json
app.use(cookieParser(process.env.COOKIE_SECRET_KEY)) // adds secret key to protect cookies
app.use(express.urlencoded({ extended: true })) // for form submissions

// Routes
app.get('/check-login', (req, res) => {
  // Checks if request has cookie with username
  if (req.cookies.username) {
    res.status(200).json({
      username: req.cookies.username,
      loggedIn: true
    })
  } else {
    res.status(401).json({
      message: 'User is not logged in'
    })
  }
})

app.post('/login', async (req, res) => {
  // When user submits login form
  const { username, password } = req.body // this data is coming from the login form data

  // Check if user exist of database
  const user = users.find(user => user.username === username)

  if (user) {
    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password)

    if (isMatch) {
      // Set cookie and send response for successful login
      res.cookie('username', username, {
        maxAge: 60000 * 60 * 24 // 1 day
      })
      res.status(200).json({
        username: username,
        loggedIn: true
      })
    } else {
      // Passwords do not match
      res.status(401).json({
        message: 'Password incorrect!'
      })
    }
  } else {
    // User does not exist
    res.status(404).json({
      message: 'User does not exist!'
    })
  }
})

app.post('/signup', async (req, res) => {
  const { username, password } = req.body

  // Check if username exists on database
  const existingUser = users.find(user => user.username === username)

  if (existingUser) {
    return res.status(409).json({
      message: 'Username taken'
    })
  } else {
    // Hash password and create new user if username is not taken
    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = {
      username: username,
      password: hashedPassword
    }
    console.log(newUser)
    users.push(newUser)

    // Set cookie for new user
    res.cookie('username', username, {
      maxAge: 60000 * 60 * 24 // expires in 1 day
    })

    // Send response with user data
    res.json({
      username: username,
      loggedIn: true
    })
  }
})

app.get('/logout', (req, res) => {
  res.clearCookie('username') // deletes the username cookie from the user browser
  res.json({
    username: '',
    loggedIn: false
  })
})

// Start server
app.listen(process.env.BACKEND_PORT, () => {
  console.log(`Server is running on port ${process.env.BACKEND_PORT}...`)
})