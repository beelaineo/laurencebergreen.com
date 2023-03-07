import * as React from 'react'
const { useState } = React

const MenuContext = React.createContext(null)

interface MenuProviderProps {
  children: React.ReactNode
}

interface rgbaColor {
  alpha: number
  hex: string
  hsl: {
    a: number
    h: number
    l: number
    s: number
  }
  hsv: {
    a: number
    h: number
    s: number
    v: number
  }
  rgb: {
    a: number
    b: number
    g: number
    r: number
  }
  _type: "color"
}

const MenuProvider = ({ children }: MenuProviderProps) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [menuColor, setMenuColor] = useState('rgba(142,45,45,.85)')
  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen)
  }
  const closeMenu = () => {
    setMenuIsOpen(false)
  }
  const openMenu = () => {
    setMenuIsOpen(true)
  }
  const resetMenuColor = () => {
    setMenuColor('rgba(142,45,45,.85)')
  }
  const updateMenuColor = (color: rgbaColor) => {
    const rgbCode = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},.85))`
    setMenuColor(rgbCode)
  }
  return (
    <MenuContext.Provider value={{ menuIsOpen, toggleMenu, openMenu, closeMenu, updateMenuColor, menuColor, resetMenuColor }}>
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