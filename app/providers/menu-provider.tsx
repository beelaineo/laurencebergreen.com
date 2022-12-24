import * as React from 'react'
const { useState } = React

const MenuContext = React.createContext(null)

interface MenuProviderProps {
  children: React.ReactNode
}

const MenuProvider = ({ children }: MenuProviderProps) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen)
    console.log('menu is open', menuIsOpen)
  }
  const closeMenu = () => {
    setMenuIsOpen(false)
  }
  const openMenu = () => {
    setMenuIsOpen(true)
  }
  return (
    <MenuContext.Provider value={{ menuIsOpen, toggleMenu, openMenu, closeMenu }}>
      {children}
    </MenuContext.Provider>
  )
}

const useMenu = () => {
  const context = React.useContext(MenuContext)
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider')
  }
  return context
}

export { MenuProvider, useMenu }