import express from 'express'
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
} from '../controllers/product.controller'

const router = express.Router()
router.get('/products', getAllProducts)
router.get('/products/:id', getProductById)
router.post('/product', createProduct)
router.put('/product/:productId', updateProduct)
router.delete('/product/:productId', deleteProduct)

export { router as productRouter }
