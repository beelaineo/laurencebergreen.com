import * as React from 'react'
import { useMenu } from '../providers/menu-provider'
const { useState } = React


const Header = () => {
  const { menuIsOpen, toggleMenu } = useMenu()
  const handleClick = () => {
    toggleMenu()
  }
  return (
    <>
      <header>
        <button className={`menu-toggle${menuIsOpen ? ' active' : ''}`} onClick={handleClick} />
      </header>
    </>
  )
}

export default Header