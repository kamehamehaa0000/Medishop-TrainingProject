import { Request, Response } from 'express'
import asyncHandler from '../utilities/AsyncHandler'
import ApiError from '../utilities/ErrorHandler'
import ApiResponse from '../utilities/ResponseHandler'
import { Order } from '../models/order.model'
import { Cart } from '../models/cart.model'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

const createOrder = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.body
  const cart = await Cart.findOne({ user: userId }).populate('items.product')
  if (!cart) {
    throw new ApiError(404, 'Cart not found')
  }

  const totalPrice = cart.items.reduce((sum, item) => {
    return sum + (item.product as any).price * item.quantity
  }, 0)

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalPrice * 100,
    currency: 'inr',
    metadata: { userId: userId.toString() },
  })

  const order = new Order({
    user: userId,
    items: cart.items,
    totalPrice,
    status: 'Pending',
    paymentIntentId: paymentIntent.id,
  })

  await order.save()
  await Cart.findByIdAndDelete(cart._id)
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { order, clientSecret: paymentIntent.client_secret },
        'Order created successfully'
      )
    )
})

const completeOrder = asyncHandler(async (req: Request, res: Response) => {
  const { orderId, paymentIntentId } = req.body
  const order = await Order.findById(orderId)
  if (!order) {
    throw new ApiError(404, 'Order not found')
  }

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
  if (paymentIntent.status !== 'succeeded') {
    throw new ApiError(400, 'Payment not successful')
  }

  order.status = 'Completed'
  await order.save()
  res
    .status(200)
    .json(new ApiResponse(200, order, 'Order completed successfully'))
})

const getOrder = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const order = await Order.findById(id).populate('items.product')
  if (!order) {
    throw new ApiError(404, 'Order not found')
  }
  res
    .status(200)
    .json(new ApiResponse(200, order, 'Order fetched successfully'))
})
export { createOrder, completeOrder, getOrder }
