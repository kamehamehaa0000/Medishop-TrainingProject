import express from 'express'
import userRouter from './user.router'
import upload from '../config/multer'
import {
  addface,
  googleLogin,
  loginFace,
  userSignup,
} from '../controllers/user.controller'
const router = express.Router()
router.post('/user/signup', upload.single('avatar'), userSignup)
router.post('/user/google', googleLogin)
router.post('/user/add-face', upload.single('addFace'), addface)
router.post('/user/login-face', upload.single('loginFace'), loginFace)
export { router as mainRouter }
