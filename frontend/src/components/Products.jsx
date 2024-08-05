import ProductCard from './ProductCard'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
const Products = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('/api/products').then((response) => {
      setProducts(response.data)
    })
  }, [])

  const addToCart = (productId) => {
    axios.post('/api/cart/add', {
      userId: 'current_user_id',
      productId,
      quantity: 1,
    })
  }

  return (
    <div className=" w-full bg-[#] my-4 rounded-3xl mt-10">
      <h1 className="text-xl md:text-4xl w-fit font-bold">Products</h1>
      <br />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        <ProductCard bgColor="#FFEB68" />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  )
}

export default Products
