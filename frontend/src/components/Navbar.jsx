import React from 'react'
import { BsCart2 } from 'react-icons/bs'
import { IoPersonOutline } from 'react-icons/io5'

const Navbar = () => {
  return (
    <div className="flex w-full items-center mb-5 justify-between px-4 bg-[#F6F7F8] h-16 rounded-2xl">
      <div className="font-semibold flex items-center px-2 text-2xl">
        <span>Medishop</span>
        <div className="h-[30px] mx-4 w-[1px] rounded-lg bg-gray-300"></div>
      </div>

      <div className="flex text-lg mr-2">
        <div className="mx-2 text-green-500 flex items-center">
          <BsCart2 className="mx-2 text-xl" />
          <h1 className="hidden sm:block">Cart </h1>
        </div>

        <button className="text-xl text-orange-500  flex items-center">
          <IoPersonOutline className="mx-2 text-xl" />
          <h1 className="hidden sm:block">Login </h1>
        </button>
      </div>
    </div>
  )
}

export default Navbar
