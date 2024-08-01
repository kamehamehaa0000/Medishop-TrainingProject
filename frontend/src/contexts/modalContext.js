import { createContext } from 'react'
const modalContext = createContext({
  loginModalIsClose: true,
  signUpModalIsClose: true,
  CartModalIsOpen: false,
  setLoginModalIsClose: () => {},
  setSignupModalIsClose: () => {},
  setCartModalIsOpen: () => {},
})

export default modalContext
