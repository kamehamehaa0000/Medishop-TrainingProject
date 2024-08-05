import express from 'express'
import {
  createOrder,
  completeOrder,
  getOrder,
} from '../controllers/order.controller'

const router = express.Router()

router.get('/orders/:id', getOrder)
router.post('/create', createOrder)
router.post('/complete', completeOrder)

export { router as orderRouter }
