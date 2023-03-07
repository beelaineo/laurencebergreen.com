import Head from 'next/head'
import Img from 'next/image'
import { useNextSanityImage, UseNextSanityImageProps } from 'next-sanity-image'
import styles from '../../styles/Books.module.css'
import sanityClient from '../../sanityClient'
import { Book, Post } from '../../sanity-schema'
import { SanityKeyed } from 'sanity-codegen'
import { Book as BookType } from '../../sanity-schema'
import BookItem from '../../components/book-item'
import { Parallax } from 'react-scroll-parallax'
import { motion } from "framer-motion"
import React, {useRef, useEffect, useState} from 'react'
import { NotFound } from '../../components/not-found'
import { useMenu } from '../../providers/menu-provider'

interface BooksIndexProps {
  books?: BookType[]
}

export default function BooksIndex({ books }: BooksIndexProps) {
  const [loading, setLoading] = useState(true)
  const { resetMenuColor } = useMenu()
  useEffect(() => {
    resetMenuColor()
    const loadingTimer = setTimeout(() => {setLoading(false), 1000})
    return () => {
      clearTimeout(loadingTimer)
    }
  }, [])

  if (!books) return <NotFound />

  const booksPrimary = books?.filter((item: BookType) => item.category == 'book' )
  const booksYA = books?.filter((item: BookType) => item.category == 'ya_book' )

  const booksRows = booksPrimary.reduce((resultArray, item, index) => { 
    const chunkIndex = Math.floor(index/2)

    if(!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []
    }

    resultArray[chunkIndex].push(item)

    return resultArray
  }, [])

  const booksRowsYA = booksYA.reduce((resultArray, item, index) => { 
    const chunkIndex = Math.floor(index/2)

    if(!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []
    }

    resultArray[chunkIndex].push(item)

    return resultArray
  }, [])
  
  return (
    <>
      <Head>
        <title>Books</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Parallax speed={-10} className={styles.heading}>
          <h1>Books</h1>
        </Parallax>
        <section className={styles.books_grid}>
          {booksRows.map((row: BookType[], i: number) => (
            <div className={styles.row} key={i}>
              <div className={styles.books}>
                {row.map((book: BookType) => (
                    <BookItem key={book._id} book={book} view="books" />
                ))}
              </div>
              <div className={styles.background}>
                <div className={styles.shelf}></div>
                <div className={styles.shelf}></div>
              </div>
            </div>
          ))}
        </section>
        <section className={styles.books_grid + ' ' + styles.ya_books}>
          <Parallax speed={-10} className={styles.heading}>
            <h2>Young Adult Books</h2>
          </Parallax>
          {booksRowsYA.map((row: BookType[], i: number) => (
            <div className={styles.row} key={i}>
              <div className={styles.books}>
                {row.map((book: BookType) => (
                    <BookItem key={book._id} book={book} view="books" />
                ))}
              </div>
              <div className={styles.background}>
                <div className={styles.shelf}></div>
                <div className={styles.shelf}></div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const books = await sanityClient.fetch(`*[_type == "book"]`)
  return {
    props: {
      books,
    },
    revalidate: 10
  }
}