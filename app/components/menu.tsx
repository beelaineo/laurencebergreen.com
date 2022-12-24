import * as React from 'react'
import Link from 'next/link'
import styles from '../styles/Menu.module.css'
import { useMenu } from '../providers/menu-provider'
import sanityClient from '../sanityClient'
import { SanityKeyed } from 'sanity-codegen'
import { Book as BookType } from '../sanity-schema'

const { useEffect, useState } = React

interface NavLinkType {
  slug: string
  title: string
}

export default function Menu() {
  const [settings, setSettings] = useState(null)
  const [books, setBooks] = useState(null)
  const { menuIsOpen, toggleMenu } = useMenu()

  useEffect(() => {
    async function fetchData() {
      const [settings, books] = await Promise.all([
        sanityClient.fetch(`*[_type == "settings"][0]{
          nav_links[] {
            title,
            'slug': coalesce(page->slug.current, '')
          }
        }`),
        sanityClient.fetch(`*[_type == "book"]{
          title,
          "slug": slug.current,
          date
        }`)
      ])
      setSettings(settings)
      setBooks(books)
    }
    fetchData()
  }, [])

  return (
    <div className={([styles.menu, menuIsOpen ? styles.open : '']).join(" ")}>
      <div className={styles.wrapper}>
        <nav className={styles.nav}>
          {settings?.nav_links.map((item: SanityKeyed<NavLinkType>, i: number) => (
            <Link key={i} href={item.slug}>{item.title}</Link>
            )
          )}
        </nav>
        <div className={styles.books}>
          {books?.map((item: SanityKeyed<BookType>, i: number) => (
            <Link key={i} href={`/${item.slug}`}>{item.title}</Link>
            )
          )}
        </div>
        <div className={styles.books}>
          <h3>Young Adult Books</h3>
          {books?.map((item: SanityKeyed<BookType>, i: number) => (
            <Link key={i} href={`/${item.slug}`}>{item.title}</Link>
            )
          )}
        </div>
      </div>
    </div>
  )
}





// export default function Footer() {
//   const [settings, setSettings] = useState(null)
//   const year = new Date().getFullYear()

//   useEffect(() => {
//     async function fetchData() {
//       const ss = await sanityClient.fetch(`*[_type == "settings"][0]{
//         ...,
//         footer_links[] {
//           title,
//           'slug': coalesce(page->slug.current, '')
//         }
//       }`)
//       console.log(ss)
//       setSettings(ss)
//     }
//     fetchData()
//   }, [])

//   return (
//     <footer className={styles.footer}>
//       <div className={styles.socials}>
//         {settings?.socials_title && <Parallax speed={-10} className={styles.h2}>{settings.socials_title}</Parallax>}
//         {settings?.socials.map((item: SanityKeyed<SocialType>, i: number) => (
//             <Link key={i} href={item.url} target="_blank">{item.title}</Link>
//           )
//           )}
//       </div>
//       <div className={styles.wrapper}>
//         <nav className={styles.nav}>
//           {settings?.footer_links.map((item: SanityKeyed<FooterLinkType>, i: number) => (
//             <Link key={i} href={item.slug == '' ? '/' : '/' + item.slug}>{item.title}</Link>
//           )
//           )}
//         </nav>
//         <div className={styles.copyright}>{settings?.copyright && settings?.copyright} {year}</div>
//         <a className={styles.credit} href={settings?.credit.url} target="_blank" rel="noreferrer">{settings?.credit.text}</a>
//       </div>
//     </footer>
//   )
// }
