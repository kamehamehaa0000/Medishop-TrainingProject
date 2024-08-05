import asyncHandler from '../utilities/AsyncHandler'
import ApiError from '../utilities/ErrorHandler'
import ApiResponse from '../utilities/ResponseHandler'
import { Request, Response } from 'express'
import { z } from 'zod'
import { Product } from '../models/product.model'

const productSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().min(10).max(1000),
  price: z.number().min(0),
  category: z.string().min(3).max(50).default('All'),
  stock: z.number().min(0),
  imageUrl: z.string(),
  dosage: z.string().default('As prescribed by Doctor.'),
  directions: z.string().default('As described by Doctor.'),
})
const getAllProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find()
  if (!products) {
    throw new ApiError(404, 'No products found')
  }
  res
    .status(200)
    .json(new ApiResponse(200, products, 'Products fetched successfully'))
})
const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const product = await Product.findById(id)
  if (!product) {
    throw new ApiError(404, 'Product not found')
  }
  res
    .status(200)
    .json(new ApiResponse(200, product, 'Product fetched successfully'))
})

const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const { success, error } = productSchema.safeParse(req.body)
  if (!success) {
    throw new ApiError(400, `Invalid Inputs: ${error}`)
  }

  const product = await Product.create(req.body)
  return res
    .status(201)
    .json(new ApiResponse(201, product, 'Product created successfully'))
})

const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.params
  const { success, error } = productSchema.partial().safeParse(req.body)
  if (!success) {
    throw new ApiError(400, `Invalid Inputs: ${error}`)
  }

  const product = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
    runValidators: true,
  })

  if (!product) {
    throw new ApiError(404, 'Product not found')
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product, 'Product updated successfully'))
})

const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.params

  const product = await Product.findByIdAndDelete(productId)
  if (!product) {
    throw new ApiError(404, 'Product not found')
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, 'Product deleted successfully'))
})
const searchProducts = asyncHandler(async (req: Request, res: Response) => {
  const { query } = req.query

  if (!query || typeof query !== 'string') {
    throw new ApiError(400, 'Query parameter is required and must be a string')
  }

  const searchTerm = query.trim()
  const products = await Product.find({
    $or: [
      { name: { $regex: searchTerm, $options: 'i' } },
      { description: { $regex: searchTerm, $options: 'i' } },
    ],
  })

  if (products.length === 0) {
    return res.status(404).json(new ApiResponse(404, [], 'No products found'))
  }

  res
    .status(200)
    .json(new ApiResponse(200, products, 'Products fetched successfully'))
})
export {
  createProduct,
  updateProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  searchProducts,
}
