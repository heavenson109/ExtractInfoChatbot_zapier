import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import logoColorSVG from '../assets/logos/TheMark-Logo-Icon-Colour.svg';

const Header = () => {
  return (
    <div className='flex gap-4 text-white p-8 items-center'>
      <GiHamburgerMenu />
      <p className='font-playfair font-bold text-xl'>The Mark Acamedy</p>
      <img src={logoColorSVG} alt="" className='w-[30px] h-[30px]' />
    </div>
  )
}

export default Header