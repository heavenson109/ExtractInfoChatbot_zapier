import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
// import logoColorSVG from '../assets/logos/TheMark-Logo-Icon-Colour.svg';
import logoColorSVG from '../assets/logos/TheMark-Logo-Horizontal-Reverse.png'; 

const Header = () => {
  return (
    <div className='flex gap-4 text-white p-8 items-center'>
      <GiHamburgerMenu />
      <img src={logoColorSVG} alt="" className='h-[50px]' />
    </div>
  )
}

export default Header