import '../styles/globals.css'
import type { AppProps } from 'next/app'
import localFont from '@next/font/local'

const boogy = localFont({ src: '../fonts/Boogy_Brut_Poster_WEB-White.woff2' })
const monument = localFont({
  src: '../fonts/ABCMonumentGroteskSemi-Mono-Light.woff2',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        :root {
          --font-sans: ${monument.style.fontFamily};
          --font-serif: ${boogy.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  )
}
