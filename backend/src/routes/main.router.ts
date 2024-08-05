import express from 'express'
import userRouter from './user.router'
import { productRouter } from './product.router'
import { cartRouter } from './cart.router'
import { orderRouter } from './order.router'

const router = express.Router()
router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/cart', cartRouter)
router.use('/order', orderRouter)
export { router as mainRouter }
