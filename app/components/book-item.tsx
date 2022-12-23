import * as React from 'react'
const { useState } = React
import { Book as BookType } from '../sanity-schema'
import styles from '../styles/BookItem.module.css'
import Img from 'next/image'
import Image from 'next/image'
import { useNextSanityImage, UseNextSanityImageProps } from 'next-sanity-image'
import sanityClient from '../sanityClient'
import { Parallax } from 'react-scroll-parallax'
import BookCoverBG from './cover-bg'

interface BookItemProps {
  book: BookType
}

const BookItem = ({ book }: BookItemProps) => {
  const { title, slug, cover, color, date, buy_link } = book
  const formattedTitle = title == 'In Search of a Kingdom' ? title.replace("Search of", "Search\nof") : title
  const imgProps: UseNextSanityImageProps = useNextSanityImage(
		sanityClient,
		cover
	)
  return (
    <div className={styles.item}>
      <div className={styles.cover_wrapper}>
        <Img
          src={imgProps.src}
          loader={imgProps.loader}
          alt="hero image"
          fill
          style={{ objectFit: 'contain' }}
          className={styles.cover_image}
        />
        <BookCoverBG color={'rgba(142, 45, 45, 1)'} />
        <div className={styles.cover_shadow}>
          <Image src="/book_shadow.png" alt="Book Cover Shadow" fill />
        </div>
      </div>
      <Parallax speed={-5} className={styles.info}>
        <h3>{formattedTitle}</h3>
      </Parallax>
    </div>
  )
}

export default BookItem