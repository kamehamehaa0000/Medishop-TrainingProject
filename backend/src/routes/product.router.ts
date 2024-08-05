import express from 'express'
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
} from '../controllers/product.controller'
import authenticate from '../middlewares/userAuth.middleware'

const router = express.Router()
router.get('/products', getAllProducts)
router.get('/products/:id', getProductById)
router.post('/product', authenticate, createProduct)
router.put('/product/:productId', authenticate, updateProduct)
router.delete('/product/:productId', authenticate, deleteProduct)

export { router as productRouter }
