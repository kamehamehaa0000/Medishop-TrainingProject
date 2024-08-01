import asyncHandler from '../utilities/AsyncHandler'
import ApiError from '../utilities/ErrorHandler'
import ApiResponse from '../utilities/ResponseHandler'
import bcrypt from 'bcrypt'
import { User } from '../models/user.model'
import jwt from 'jsonwebtoken'
import { Request, response, Response } from 'express'
import { z } from 'zod'
import { uploadToCloudinary } from '../utilities/cloudinaryUtils'
import { verifyGoogleToken } from '../utilities/Oauth'
import { nanoid } from 'nanoid' // Or any other unique ID generator
import * as faceapi from '@vladmandic/face-api'

const signupSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  password: z.string(),
  avatar: z.any(),
  email: z.string().email(),
})
const userSignup = asyncHandler(async (req: Request, res: Response) => {
  const { firstName, lastName, username, password, avatar, email } = req.body
  try {
    const { success, error } = signupSchema.safeParse(req.body)
    if (!success) {
      throw new ApiError(401, `Invalid Inputs ${error}`)
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      throw new ApiError(409, 'User Already exists')
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const file = (req.file as Express.Multer.File) || undefined
    const avatarLocalPath = file?.path || ''
    if (!avatarLocalPath) {
      throw new ApiError(400, 'Avatar file is required or is invalid')
    }
    const avatarUrl: string = (await uploadToCloudinary(avatarLocalPath))?.url

    const user = await User.create({
      firstName,
      lastName,
      username,
      password: hashedPassword,
      avatar: avatarUrl,
      email,
    })
    const createdUser = await User.findById(user._id).select('-password')
    if (!createdUser) {
      throw new ApiError(500, 'Something went wrong while registering the user')
    }
    return res
      .status(200)
      .json(new ApiResponse(200, createdUser, 'User Registered Successfully'))
  } catch (error) {
    throw new Error(
      `Error during Signup.. User not Registered , Error =  ${error}`
    )
  }
})
const generateUniqueUsername = (displayName: string | undefined) => {
  if (!displayName) {
    displayName = 'newUser'
  }
  displayName = displayName.split(' ')[0]
  return `${displayName}-${nanoid(5)}`
}
const googleLogin = asyncHandler(async (req: Request, res: Response) => {
  const { token } = req.body
  try {
    const payload = await verifyGoogleToken(token)
    if (!payload) {
      throw new ApiError(401, 'Invalid Google token')
    }
    const {
      sub: googleId,
      email,
      given_name,
      family_name,
      name,
      picture,
    } = payload

    const username = generateUniqueUsername(name)

    let user = await User.findOne({ email })
    if (!user) {
      user = await User.create({
        googleId,
        username,
        firstName: given_name,
        lastName: family_name,
        email,
        avatar: picture,
      })
    } else if (!user.googleId) {
      user.googleId = googleId
      await user.save()
    }
    const secret = process.env.JWT_SECRET

    if (!secret) {
      throw new Error('JWT_SECRET environment variable is not defined')
    }

    const jwtToken = jwt.sign({ userId: user._id }, secret, {
      expiresIn: '4h',
    })
    res.cookie('token', jwtToken)
    const resUser = await User.findOne({ email }).select([
      '-password',
      '-googleId',
    ])

    return res
      .status(200)
      .json(new ApiResponse(200, { resUser, token: jwtToken }))
  } catch (error) {
    console.log('ERROR from controller')
    throw new Error((error as Error).message)
  }
})

const addface = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.body
  const file = (req.file as Express.Multer.File) || undefined
  const imageLocalPath = file?.path || ''
  try {
    if (!imageLocalPath) {
      throw new ApiError(400, 'Avatar file is required or is invalid')
    }
    const faceidUrl: string = (await uploadToCloudinary(imageLocalPath))?.url
    const img = await faceapi.fetchImage(faceidUrl)
    const detections = await faceapi
      .detectSingleFace(img)
      .withFaceLandmarks()
      .withFaceDescriptor()

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    user.faceDescriptors = detections?.descriptor
    await user.save()
    res.status(200).json({ message: 'Face descriptors added successfully' })
  } catch (error) {
    console.log(error)
    throw new Error((error as Error).message)
  }
})
const loginFace = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.body
  const file = (req.file as Express.Multer.File) || undefined
  const imageLocalPath = file?.path || ''
  try {
    if (!imageLocalPath) {
      throw new ApiError(400, 'Avatar file is required or is invalid')
    }
    const faceidUrl: string = (await uploadToCloudinary(imageLocalPath))?.url
    const img = await faceapi.fetchImage(faceidUrl)
    const detections = await faceapi
      .detectSingleFace(img)
      .withFaceLandmarks()
      .withFaceDescriptor()
    if (!detections) {
      return res.status(400).json(new ApiResponse(400, 'No face detected'))
    }
    const users = await User.find()
    const faceMatcher = new faceapi.FaceMatcher(
      users.map(
        (user) =>
          new faceapi.LabeledFaceDescriptors(user._id.toString(), [
            new Float32Array(user.faceDescriptors),
          ])
      )
    )

    const bestMatch = faceMatcher.findBestMatch(detections.descriptor)

    if (bestMatch.label === 'unknown') {
      return res.status(401).json({ error: 'Face not recognized' })
    }
    const user = await User.findById(bestMatch.label)
    const secret = process.env.JWT_SECRET

    if (!secret) {
      throw new Error('JWT_SECRET environment variable is not defined')
    }
    const token = jwt.sign({ userId: user?._id }, secret, {
      expiresIn: '4h',
    })
    res.cookie('token', token)
    res.status(200).json({ user, token })
  } catch (error) {}
})
export { userSignup, googleLogin, addface, loginFace }
