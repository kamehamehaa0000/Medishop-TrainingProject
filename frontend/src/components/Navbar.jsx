import React, { useState, useEffect } from 'react'
import { BsCart2 } from 'react-icons/bs'
import { IoPersonOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Navbar = () => {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const debouncedSearch = useDebounce(search, 500)
  useEffect(() => {
    if (debouncedSearch) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `/api/search?query=${debouncedSearch}`
          )
          setResults(response.data.data)
        } catch (error) {
          console.error('Error fetching search results', error)
        }
      }
      fetchData()
    } else {
      setResults([])
    }
  }, [debouncedSearch])

  return (
    <div className="flex relative w-full items-center mb-5 justify-between px-4 bg-[#F6F7F8] h-16 rounded-2xl">
      <Link to={'/home'}>
        <div className="font-semibold flex items-center px-2 text-2xl">
          <span>Medishop</span>
          <div className="h-[30px] mx-4 w-[1px] rounded-lg bg-gray-300"></div>
        </div>
      </Link>

      <div className="flex  flex-grow  items-center justify-center">
        <Search input={search} setInput={setSearch} />
      </div>

      <div className="flex text-lg mr-2">
        <div className="mx-2 text-green-500 flex items-center">
          <BsCart2 className="mx-2 text-xl" />
          <h1 className="hidden sm:block">Cart </h1>
        </div>
        <Link to="/signin ">
          <button className="text-xl text-orange-500  flex items-center">
            <IoPersonOutline className="mx-2 text-xl" />

            <h1 className="hidden sm:block">Login </h1>
          </button>{' '}
        </Link>
      </div>
      {/* Show search only when search state is not empty */}
      {search ? <Results results={results} /> : <></>}
    </div>
  )
}

export default Navbar

const Search = ({ input, setInput }) => {
  return (
    <div class=" w-full bg-white rounded-2xl">
      <div class="flex">
        <div className="flex flex-col w-full justify-center">
          <input
            type="text"
            class="w-full rounded-2xl bg-white pl-2 text-base text-gray-400 font-semibold outline-0"
            placeholder="Search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div class="hidden sm:flex w-10 h-10 rounded-full items-center justify-center p-5  bg-[#9FE870] ">
          <svg
            viewBox="0 0 20 20"
            aria-hidden="true"
            class="pointer-events-none absolute w-5 fill-gray-500 transition"
          >
            <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
          </svg>
        </div>
      </div>
    </div>
  )
}

const Results = ({ results }) => {
  return (
    <div className=" flex flex-col p-4 items-center justify-center absolute rounded-xl overflow-y-auto z-[99] left-[50%] mx-auto -translate-x-1/2 top-[120%] w-11/12 sm:w-[80%]  h-60 bg-[#F6F7F8]">
      {results?.length > 0 ? (
        results?.map((result) => (
          <div
            key={result?._id}
            className="p-4 hover:bg-gray-100 cursor-pointer"
          >
            <Link to={`/product/${result?._id}`}>
              <h3 className="text-lg font-semibold">{result?.name}</h3>
              <p className="text-sm text-gray-500">{result?.description}</p>
            </Link>
          </div>
        ))
      ) : (
        <div className="p-4 text-center text-gray-500">No results found</div>
      )}
    </div>
  )
}

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
