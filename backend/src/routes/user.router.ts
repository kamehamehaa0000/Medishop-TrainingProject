import express from 'express'

import upload from '../config/multer'
import {
  addface,
  googleLogin,
  loginFace,
  userSignup,
  getUser,
  updateUser,
} from '../controllers/user.controller'
import authenticate from '../middlewares/userAuth.middleware'
const router = express.Router()

router.get('/users/:id', authenticate, getUser)
router.put('/users/:id', authenticate, upload.single('avatar'), updateUser)
router.post('/user/signup', upload.single('avatar'), userSignup)
router.post('/user/google', googleLogin)
// router.post('/user/add-face', upload.single('addFace'), addface)
// router.post('/user/login-face', upload.single('loginFace'), loginFace)

export default router
