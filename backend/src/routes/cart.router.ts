import express from 'express'
import {
  addToCart,
  removeFromCart,
  getCart,
} from '../controllers/cart.controller'

const router = express.Router()

router.get('/cart', getCart)
router.post('/add', addToCart)
router.post('/remove', removeFromCart)

export { router as cartRouter }
