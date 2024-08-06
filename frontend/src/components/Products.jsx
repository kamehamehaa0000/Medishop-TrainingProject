import ProductCard from './ProductCard'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from './shared/Loader'
import { useProduct } from '../hooks/useProduct'
import { useAddToCart } from '../hooks/useCart'
const Products = () => {
  const { mutate: addToCart } = useAddToCart()

  const { data: products, isLoading, error } = useProduct()

  if (isLoading)
    return (
      <div className=" w-full bg-[#] my-4 rounded-3xl mt-10">
        <h1 className="text-xl md:text-4xl w-fit font-bold">Products</h1>
        <Loader />
      </div>
    )
  if (error)
    return (
      <p>
        <div className=" w-full bg-[#] my-4 rounded-3xl mt-10">
          <h1 className="text-xl md:text-4xl w-fit font-bold">Products</h1>
          <h1 className="text-center">Error Loading the Products.</h1>
        </div>
      </p>
    )
  return (
    <div className=" w-full bg-[#] my-4 rounded-3xl mt-10">
      <h1 className="text-xl md:text-4xl w-fit font-bold">Products</h1>
      <br />
      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {products.data.map((product, index) => {
            const discountedPrice =
              product.price - (product.offerPercentage / 100) * product.price
            return (
              <ProductCard
                title={product.name}
                brand={product.brand}
                key={index}
                category={product.category}
                img={product.imageUrl}
                originalPrice={product.price}
                discountedPrice={discountedPrice}
                handleAddToCart={addToCart}
                _id={product._id}
                offer={product.offerPercentage.toString()}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Products
