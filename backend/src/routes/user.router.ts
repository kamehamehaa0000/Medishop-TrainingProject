import express from 'express'

import upload from '../config/multer'
import {
  googleLogin,
  userSignup,
  getUser,
  updateUser,
  userLogin,
  userLogout,
  checkAuth,
} from '../controllers/user.controller'
import authenticate from '../middlewares/userAuth.middleware'
const router = express.Router()

router.get('/getUser', authenticate, getUser)
router.put('/update/:id', authenticate, upload.single('avatar'), updateUser)
router.post('/signup', upload.single('avatar'), userSignup)
router.post('/signin', userLogin)
router.post('/logout', userLogout)
router.post('/google', googleLogin)
router.get('/check-auth', checkAuth)
// router.post('/user/add-face', upload.single('addFace'), addface)
// router.post('/user/login-face', upload.single('loginFace'), loginFace)

export default router
