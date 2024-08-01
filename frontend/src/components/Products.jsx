import React from 'react'
import ProductCard from './ProductCard'

const Products = () => {
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
