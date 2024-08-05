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
const router = express.Router()

router.get('/users/:id', getUser)
router.put('/users/:id', upload.single('avatar'), updateUser)
router.post('/user/signup', upload.single('avatar'), userSignup)
router.post('/user/google', googleLogin)
router.post('/user/add-face', upload.single('addFace'), addface)
router.post('/user/login-face', upload.single('loginFace'), loginFace)

export default router
