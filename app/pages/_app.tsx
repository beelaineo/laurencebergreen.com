import '../styles/globals.css'
import type { AppProps } from 'next/app'
import localFont from '@next/font/local'
import Header from '../components/header'
import Menu from '../components/menu'
import Footer from '../components/footer'
import sanityClient from '../sanityClient'
import { ParallaxProvider } from 'react-scroll-parallax'

const boogy = localFont({ src: '../fonts/Boogy_Brut_Poster_WEB-White.woff2' })
const monument = localFont({
  src: '../fonts/ABCMonumentGroteskSemi-Mono-Light.woff2',
})

export default function App({ Component, pageProps}: AppProps) {
  return (
    <ParallaxProvider>
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
    </ParallaxProvider>
  )
}