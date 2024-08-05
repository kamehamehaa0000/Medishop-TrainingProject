import React, { useContext, useState } from 'react'
import Navbar from './components/Navbar'
import modalContext from './contexts/modalContext'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProductDetails from './pages/ProductDetails'
import NotFound from './pages/404/NotFound'
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
          <div className="w-full min-h-screen overflow-x-hidden text-xl p-2 sm:p-10 pb-2  font-[gilroy]">
            <Navbar />
            <Routes>
              <Route exact path="/" element={<LandingPage />} />
              <Route exact path="/home" element={<LandingPage />} />
              <Route exact path="/signup" element={<SignupPage />} />
              <Route exact path="/signin" element={<LoginPage />} />
              <Route exact path="/product" element={<ProductDetails />} />
              <Route exact path="/cart" element={<ProductDetails />} />
              <Route exact path="*" element={<NotFound />} />
            </Routes>{' '}
          </div>{' '}
        </modalContext.Provider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  )
}

export default App
