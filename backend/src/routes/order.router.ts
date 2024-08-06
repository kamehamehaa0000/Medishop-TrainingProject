import express from 'express'
import {
  createOrder,
  completeOrder,
  getOrder,
} from '../controllers/order.controller'
import authenticate from '../middlewares/userAuth.middleware'

const router = express.Router()

router.get('/:id', authenticate, getOrder)
router.post('/create', authenticate, createOrder)
router.post('/complete', authenticate, completeOrder)

export { router as orderRouter }
