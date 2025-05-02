import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ styles, text= ' Get Started' }) => {
  return (
    <div className=''>
      <Link 
         to="/account/register"
        className={`py-4 px-6 font-poppins font-medium cursor-pointer text-[18px] text-primary bg-gradient-to-r from-[#FF4E50] to-[#F9D423] rounded-[10px] outline-none transition-all duration-300 ease-in-out hover:from-[#F9D423] hover:to-[#FF4E50] hover:text-white ${styles}`}
      >
        {text}
      </Link>
    </div>
  )
}

export default Button
