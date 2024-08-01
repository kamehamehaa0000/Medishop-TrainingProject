import React, { useContext, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductCard from './components/ProductCard'
import Products from './components/Products'
import PlaylistCard from './components/PlaylistCard'
import PlaylistHero from './components/PlaylistHero'
import modalContext from './contexts/modalContext'
import Signup from './components/Signup'
import Footer from './components/Footer'
import Login from './components/Login'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
const App = () => {
  const [loginModalIsClose, setLoginModalIsClose] = useState(true)
  const [signUpModalIsClose, setSignupModalIsClose] = useState(true)
  const [CartModalIsOpen, setCartModalIsOpen] = useState(false)
  return (
    <BrowserRouter>
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_REACT_APP_GOOGLE_API_TOKEN}
      >
        <modalContext.Provider
          value={{
            CartModalIsOpen,
            signUpModalIsClose,
            loginModalIsClose,
            setCartModalIsOpen,
            setSignupModalIsClose,
            setLoginModalIsClose,
          }}
        >
          <div className="w-screen text-xl p-10 pb-2 font-[gilroy]">
            <Navbar />
            <Routes>
              <Route exact path="/" element={<LandingPage />} />
              <Route exact path="/home" element={<LandingPage />} />
              <Route exact path="/signup" element={<SignupPage />} />
              <Route exact path="/signin" element={<LoginPage />} />
            </Routes>{' '}
          </div>{' '}
        </modalContext.Provider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  )
}

export default App
