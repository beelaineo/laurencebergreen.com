import * as React from 'react'
import Link from 'next/link'
import styles from '../styles/Menu.module.css'
import { useMenu } from '../providers/menu-provider'
import sanityClient from '../sanityClient'
import { SanityKeyed } from 'sanity-codegen'
import { Book as BookType } from '../sanity-schema'
import { useRouter } from 'next/router'
import { motion, useScroll, useInView, Variants } from 'framer-motion'

const { useEffect, useState } = React

interface NavLinkType {
  slug: string
  title: string
}

export default function Menu() {
  const [settings, setSettings] = useState(null)
  const [books, setBooks] = useState(null)
  const { menuIsOpen, closeMenu, menuColor } = useMenu()
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

  const menuVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.33,
        staggerChildren: 0.25
      }
    },
  }

  const navLinkVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 0.25,
      }
    },
  }

  return (
    <>
    <style jsx global>{`
      a.active {
        color: #00000080;
      }
    `}</style>
    <motion.div className={styles.menu} animate={menuIsOpen ? "show" : "hidden"} variants={menuVariants} style={{ backgroundColor: menuColor}}>
      <div className={styles.wrapper}>
        <nav className={styles.nav}>
          {settings?.nav_links.map((item: SanityKeyed<NavLinkType>, i: number) => (
            <motion.div key={i} variants={navLinkVariant}>
              <Link key={i} href={item.slug} className={pathname == item.slug ? "active" : ""}>{item.title}</Link>
            </motion.div>
            )
          )}
        </nav>
        <motion.div className={styles.books} variants={navLinkVariant}>
          {books?.filter((item: SanityKeyed<BookType>) => item.category == 'book' ).map((item: SanityKeyed<BookType>, i: number) => (
            <Link key={i} href={`/books/${item.slug}`} className={asPath == `/books/${item.slug}` ? "active" : ""}>{item.title}</Link>
            )
          )}
        </motion.div>
        <motion.div className={styles.books} variants={navLinkVariant}>
          <h3>Young Adult Books</h3>
          {books?.filter((item: SanityKeyed<BookType>) => item.category == 'ya_book' ).map((item: SanityKeyed<BookType>, i: number) => (
            <Link key={i} href={`/books/${item.slug}`} className={asPath == `/books/${item.slug}` ? "active" : ""}>{item.title}</Link>
            )
          )}
        </motion.div>
      </div>
    </motion.div>
    </>
  )
}