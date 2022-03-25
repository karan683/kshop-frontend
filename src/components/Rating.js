import React from 'react'
import {AiOutlineStar , TiStarHalfOutline , HiStar} from 'react-icons/all'

const Rating = ({ value, text, color }) => {
  return (
    <div className='flex items-center justify-start'>
      <span className='text-xl m-0.5 text-yellow-400'>
        {value >= 1 ? (<HiStar />) : value >=0.5 ? (<TiStarHalfOutline/>) : (<AiOutlineStar />) }
      </span>
      <span className='text-xl m-0.5 text-yellow-400'>
        {value >= 2 ? (<HiStar />) : value >=1.5 ? (<TiStarHalfOutline/>) : (<AiOutlineStar />) }
      </span>
      <span className='text-xl m-0.5 text-yellow-400'>
      {value >= 3 ? (<HiStar />) : value >=2.5 ? (<TiStarHalfOutline/>) : (<AiOutlineStar />) }
      </span>
      <span className='text-xl m-0.5 text-yellow-400'>
      {value >= 4 ? (<HiStar />) : value >=3.5 ? (<TiStarHalfOutline/>) : (<AiOutlineStar />) }
      </span>
      <span className='text-xl m-0.5 text-yellow-400'>
      {value >= 5 ? (<HiStar />) : value >=4.5 ? (<TiStarHalfOutline/>) : (<AiOutlineStar />) }
      </span>
      <span>{text && text}</span>
    </div>
  )
}



export default Rating
