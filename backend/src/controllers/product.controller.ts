import asyncHandler from '../utilities/AsyncHandler'
import ApiError from '../utilities/ErrorHandler'
import ApiResponse from '../utilities/ResponseHandler'
import { Request, Response } from 'express'
import { z } from 'zod'
import { Product } from '../models/product.model'
import { uploadToCloudinary } from '../utilities/cloudinaryUtils'

const productSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().min(10).max(1000),
  price: z.number().min(0),
  category: z.string().min(3).max(50).default('All'),
  stock: z.number().min(0),
  imageUrl: z.string(),
  dosage: z.string().default('As prescribed by Doctor.'),
  directions: z.string().default('As described by Doctor.'),
  packOf: z.number(),
  offerPercentage: z.number(),
  brand: z.string().min(2).max(100),
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
  try {
    if (!id) {
      throw new ApiError(404, 'please provide id')
    }
    if (!product) {
      throw new ApiError(404, 'Product not found')
    }
    res
      .status(200)
      .json(new ApiResponse(200, product, 'Product fetched successfully'))
  } catch (error) {
    throw new ApiError(
      500,
      `Error creating product: ${(error as Error).message}`
    )
  }
})

const createProduct = asyncHandler(async (req: Request, res: Response) => {
  try {
    console.log('File received:', req.file)
    const file = (req.file as Express.Multer.File) || undefined
    if (!file) {
      throw new ApiError(400, 'Image file is required')
    }
    const imageLocalPath = file.path
    const imageUrl = (await uploadToCloudinary(imageLocalPath))?.url
    if (!imageUrl) {
      throw new ApiError(500, 'Image upload failed')
    }
    const {
      name,
      description,
      price,
      stock,
      category,
      dosage,
      directions,
      packOf,
      offerPercentage,
      brand,
    } = req.body
    const productData = {
      name,
      description,
      price: parseInt(price),
      stock: parseInt(stock),
      category,
      dosage,
      directions,
      packOf: parseInt(packOf),
      offerPercentage: parseInt(offerPercentage),
      imageUrl,
      brand,
    }
    const { success, error } = productSchema.safeParse(productData)
    if (!success) {
      throw new ApiError(400, `Invalid Inputs: ${error.message}`)
    }

    const product = await Product.create(productData)

    return res
      .status(201)
      .json(new ApiResponse(201, product, 'Product created successfully'))
  } catch (error) {
    throw new ApiError(
      500,
      `Error creating product: ${(error as Error).message}`
    )
  }
})

const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { productId } = req.params
  const file = (req.file as Express.Multer.File) || undefined

  let imageUrl: string | undefined
  if (file) {
    const imageLocalPath = file.path
    imageUrl = (await uploadToCloudinary(imageLocalPath))?.url
    if (!imageUrl) {
      throw new ApiError(500, 'Image upload failed')
    }
  }
  console.log(req.body)
  const productData = imageUrl ? { ...req.body, imageUrl } : req.body
  console.log(productData)
  const { success, error } = productSchema.partial().safeParse(productData)
  if (!success) {
    throw new ApiError(400, `Invalid Inputs: ${error.message}`)
  }

  const product = await Product.findByIdAndUpdate(productId, productData, {
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
      { brand: { $regex: searchTerm, $options: 'i' } },
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
