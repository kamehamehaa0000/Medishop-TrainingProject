import React from 'react'
import { BsCart3 } from 'react-icons/bs'

const ProductCard = ({
  img = 'https://www.checkers.co.za/medias/10618226EA-checkers515Wx515H?context=bWFzdGVyfGltYWdlc3wxOTU4OTl8aW1hZ2UvcG5nfGltYWdlcy9oNjMvaDk3LzkwNTUwNjMyMTIwNjIucG5nfGYxNGNkY2IzMjcyYjkyYzg0YjgwYTI5ZmEwYmM2ZDBlYjllMDVhYjNjM2Y0ZDY5YThmYzFjYjQ2OWY4NzQ0ZmU',
  brand = 'Cipla',
  category = 'Syrup',
  title = 'Linctagon Cough Cyrup (50ml)',
  offer = 200,
  originalPrice = '213000',
  discountedPrice = '20000',
  bgColor = '#9FE870',
  rating,
}) => {
  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="overflow-hidden relative max-w-60 border rounded-lg shadow-lg text-center"
    >
      {' '}
      {offer ? (
        <span className="absolute top-0 left-0 bg-yellow-300 text-black text-xs font-bold py-1 px-2 rounded">
          {offer}% Off
        </span>
      ) : (
        ''
      )}
      <div className=" relative w-full ">
        <img
          src={img}
          alt={title}
          className="h-36 transition-all ease-in-out duration-500 hover:scale-125 mx-auto my-4 object-contain object-center"
        />{' '}
        <button className="absolute bottom-0 right-0 mx-1 font-semibold text-[#083400] py-2 px-2 text-sm bg-[#9FE870]  rounded-full ">
          <BsCart3 className="text-lg inline" />{' '}
          <span className="text-xs">+</span>
        </button>
      </div>
      <div className="rounde bg-[#FFFFFF] px-2 w-full">
        <div className="flex justify-between">
          <h3 className="text-gray-400 font-semibold text-sm">{brand}</h3>
          <div className="text-yellow-500 text-sm ">★ 4.5</div>
        </div>

        <h2 className="text-left text-zinc-800 text-sm font-semibold ">
          {title}
        </h2>
        <h3 className="text-sm text-left font-semibold my-1 ">{category}</h3>
        <div className=" text-base w-full text-left inline-block font-semibold text-gray-900">
          <span className="line-through font-light text-gray-500 text-sm">
            Rs. {originalPrice ? originalPrice : discountedPrice}
          </span>{' '}
          Rs. {discountedPrice}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
