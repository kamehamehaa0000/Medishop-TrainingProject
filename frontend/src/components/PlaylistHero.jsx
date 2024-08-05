import React from 'react'
import PlaylistCard from './PlaylistCard'
import { MdOutlineArrowOutward } from 'react-icons/md'

const PlaylistHero = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-wrap gap-5 mt-10 items-center justify-center">
      <PlaylistCard
        title="Headache Comfort"
        image="/bgrem1.png"
        color={'#FEC091'}
      />
      <PlaylistCard
        title="Cough & Cold Comfort"
        image="/bgrem2.png"
        color={'#BB201E'}
      />
      <PlaylistCard image="/bgrem.png" color="#FFEB68" />
      <PlaylistCard
        title="Basic Home Medikit"
        image="/bgrem4.png"
        color={'#9FE870'}
      />

      <button className="m-10 group rounded-full px-1 py-3 flex items-center">
        <h1 className="font-semibold group-hover:mr-2 duration-100 transition-all ease-in">
          See More
        </h1>
        <MdOutlineArrowOutward className="group-hover:scale-125 mx-1 w-7 h-7 flex items-center text-lg rounded-full p-1 text-[#9FE870] bg-[#083400]" />
      </button>
    </div>
  )
}

export default PlaylistHero
