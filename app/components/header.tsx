import * as React from 'react'
const { useState } = React

const Header = () => {
  const [isOpen, setOpen] = useState(false)
  const handleClick = () => {
    setOpen(!isOpen)
    console.log(open)
  }
  return (
    <>
      <header>
        <button className={`menu-toggle${isOpen ? ' active' : ''}`} onClick={handleClick} />
      </header>
    </>
  )
}

export default Header