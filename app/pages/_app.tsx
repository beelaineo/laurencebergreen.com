import '../styles/globals.css'
import type { AppProps } from 'next/app'
import localFont from '@next/font/local'
import Header from '../components/header'
import Menu from '../components/menu'
import Footer from '../components/footer'
import { ParallaxProvider } from 'react-scroll-parallax'
import { MenuProvider } from '../providers/menu-provider'

const boogy = localFont({ src: '../fonts/Boogy_Brut_Poster_WEB-White.woff2' })
const monument = localFont({
  src: '../fonts/ABCMonumentGroteskSemi-Mono-Light.woff2',
  display: 'auto',
})

export default function App({ Component, pageProps}: AppProps) {
  return (
    <ParallaxProvider>
      <MenuProvider>
        <style jsx global>{`
          :root {
            --font-sans: ${monument.style.fontFamily};
            --font-serif: ${boogy.style.fontFamily};
          }
        `}</style>
        <Header />
        <Menu />
        <Component {...pageProps} />
        <Footer />
      </MenuProvider>
    </ParallaxProvider>
  )
}