import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import { useEffect, useState } from "react"
import Signup from "./pages/Signup"

const App = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  const [username, setUsername] = useState<string>('')

  useEffect(() => {
    const checkCookieExists = async () => {
      try {
        const response = await fetch(`http://localhost:4000/check-login`, {
          credentials: 'include'
        })
        const data = await response.json()

        if (response.ok) {
          setLoggedIn(data.loggedIn)
          setUsername(data.username)
        } else {
          console.log('Error', data.message)
        }
      } catch (err) {
        console.error(err)
      }
    }

    checkCookieExists()
  }, [])

  // Process login form
  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await fetch(`http://localhost:4000/login`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      })
      const data = await response.json()

      if (response.ok) {
        setUsername(data.username)
        setLoggedIn(data.loggedIn)
      } else {
        alert(data.message)
      }
    } catch (err) {
      console.error(err)
    }
  }

  // Process signup form
  const handleSignup = async (username: string, password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    try {
      const response = await fetch(`http://localhost:4000/signup`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      })
      const data = await response.json()
      
      if (response.ok) {
        setUsername(data.username)
        setLoggedIn(data.loggedIn)
      } else [
        alert(data.message)
      ]
    } catch (err) {
      console.error(err)
    }
  }

  // Process logout
  const handleLogout = async () => {
    try {
      const response = await fetch(`http://localhost:4000/logout`, {
        credentials: 'include'
      })
      const data = await response.json()
      setUsername(data.username)
      setLoggedIn(data.loggedIn)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={loggedIn ? <Navigate to="/profile" /> : <Login onLogin={handleLogin} />} />
        <Route path="/profile" element={loggedIn ? <Profile username={username} onLogout={handleLogout} /> : <Navigate to="/login" />} />
        <Route path="/signup" element={loggedIn ? <Navigate to="/profile" /> : <Signup onSignup={handleSignup} />} />
      </Routes>
    </Router>
  )
}

export default App