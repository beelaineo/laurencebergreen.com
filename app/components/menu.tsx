import * as React from 'react'
import Link from 'next/link'
import styles from '../styles/Menu.module.css'
import { useMenu } from '../providers/menu-provider'
import sanityClient from '../sanityClient'
import { SanityKeyed } from 'sanity-codegen'
import { Book as BookType } from '../sanity-schema'
import { useRouter } from 'next/router'

const { useEffect, useState } = React

interface NavLinkType {
  slug: string
  title: string
}

export default function Menu() {
  const [settings, setSettings] = useState(null)
  const [books, setBooks] = useState(null)
  const { menuIsOpen, closeMenu } = useMenu()
  const { asPath, pathname } = useRouter()

  useEffect(() => {
    async function fetchData() {
      const [settings, books] = await Promise.all([
        sanityClient.fetch(`*[_type == "settings"][0]{
          nav_links[] {
            title,
            'slug': route
          }
        }`),
        sanityClient.fetch(`*[_type == "book"]{
          title,
          "slug": slug.current,
          category,
          date
        }`)
      ])
      setSettings(settings)
      setBooks(books)
    }
    fetchData()
  }, [])

  useEffect(() => {
    closeMenu()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath])

  return (
    <>
    <style jsx global>{`
      a.active {
        color: #00000080;
      }
    `}</style>
    <div className={([styles.menu, menuIsOpen ? styles.open : '']).join(" ")}>
      <div className={styles.wrapper}>
        <nav className={styles.nav}>
          {settings?.nav_links.map((item: SanityKeyed<NavLinkType>, i: number) => (
            <Link key={i} href={item.slug} className={pathname == item.slug ? "active" : ""}>{item.title}</Link>
            )
          )}
        </nav>
        <div className={styles.books}>
          {books?.filter((item: SanityKeyed<BookType>) => item.category == 'book' ).map((item: SanityKeyed<BookType>, i: number) => (
            <Link key={i} href={`/books/${item.slug}`} className={asPath == `/books/${item.slug}` ? "active" : ""}>{item.title}</Link>
            )
          )}
        </div>
        <div className={styles.books}>
          <h3>Young Adult Books</h3>
          {books?.filter((item: SanityKeyed<BookType>) => item.category == 'ya_book' ).map((item: SanityKeyed<BookType>, i: number) => (
            <Link key={i} href={`/books/${item.slug}`} className={asPath == `/books/${item.slug}` ? "active" : ""}>{item.title}</Link>
            )
          )}
        </div>
      </div>
    </div>
    </>
  )
}