import { Request, Response } from 'express'
import asyncHandler from '../utilities/AsyncHandler'
import ApiError from '../utilities/ErrorHandler'
import ApiResponse from '../utilities/ResponseHandler'
import { Cart } from '../models/cart.model'
import { Product } from '../models/product.model'

const getCart = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.query
  const cart = await Cart.findOne({ userId }).populate('items.product')
  if (!cart) {
    throw new ApiError(404, 'Cart not found')
  }
  res.status(200).json(new ApiResponse(200, cart, 'Cart fetched successfully'))
})
const addToCart = asyncHandler(async (req: Request, res: Response) => {
  const { userId, productId, quantity } = req.body
  const product = await Product.findById(productId)
  if (!product) {
    throw new ApiError(404, 'Product not found')
  }

  let cart = await Cart.findOne({ user: userId })
  if (!cart) {
    cart = new Cart({ user: userId, items: [] })
  }

  const cartItemIndex = cart.items.findIndex((item) =>
    item.product.equals(productId)
  )
  if (cartItemIndex > -1) {
    cart.items[cartItemIndex].quantity += quantity
  } else {
    cart.items.push({ product: productId, quantity })
  }

  await cart.save()
  res.status(200).json(new ApiResponse(200, cart, 'Product added to cart'))
})

const removeFromCart = asyncHandler(async (req: Request, res: Response) => {
  const { userId, productId } = req.body
  let cart = await Cart.findOne({ user: userId })
  if (!cart) {
    throw new ApiError(404, 'Cart not found')
  }

  cart.items = cart.items.filter((item) => !item.product.equals(productId))
  await cart.save()
  res.status(200).json(new ApiResponse(200, cart, 'Product removed from cart'))
})

export { addToCart, removeFromCart, getCart }
