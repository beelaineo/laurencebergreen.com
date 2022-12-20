import { Html, Head, Main, NextScript } from 'next/document'
import Header from '../components/header'
import Footer from '../components/footer'
import Menu from '../components/menu'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
