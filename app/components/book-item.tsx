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
import Link from 'next/link'
import Router from 'next/router'

interface BookItemProps {
  book: BookType
  view: 'home' | 'books'
}

const BookItem = ({ book, view }: BookItemProps) => {
  const { title, slug, cover, color, date, buy_link } = book

  const formatTitle = (title: string) => {
    switch(title) {
      case 'In Search of a Kingdom':
        return title.replace("Search of", "Search\nof")
        break;
      case 'Over the Edge of the World':
        return title.replace("Over the Edge of the World", "Over the Edge\nof the World")
        break;
      case 'Voyage to Mars':
        return title.replace("Voyage to Mars", "Voyage\nto Mars")
        break;
      case 'Louis Armstrong':
        return title.replace("Louis Armstrong", "Louis\nArmstrong")
        break;
      case 'Look Now, Pay Later':
        return title.replace("Look Now, Pay Later", "Look Now,\nPay Later")
        break;
      case 'As Thousands Cheer':
        return title.replace("As Thousands Cheer", "As Thousands\nCheer")
        break;
      default:
        return title
    }
  }

  const handleClick = () => {
    Router.push(`/books/${slug.current}`)
  }

  const imgProps: UseNextSanityImageProps = useNextSanityImage(
		sanityClient,
		cover
	)
  return (
    <div className={([styles.item, view == 'books' ? styles.listing : styles.home]).join(" ")} onClick={() => handleClick()}>
      <div className={styles.cover_wrapper}>
        <Img
          src={imgProps.src}
          loader={imgProps.loader}
          alt={title}
          fill
          style={{ objectFit: 'contain' }}
          sizes="(max-width: 767px) 40vw, 33vw"
          className={styles.cover_image}
        />
        <Img
          src={imgProps.src}
          loader={imgProps.loader}
          alt={title}
          fill
          style={{ objectFit: 'contain' }}
          sizes="(max-width: 767px) 40vw, 33vw"
          className={styles.cover_image_overlay}
        />
        <BookCoverBG color={'rgba(142, 45, 45, 1)'} />
        <div className={styles.cover_shadow}>
          <Image src="/book_shadow.png" alt="Book Cover Shadow" fill />
        </div>
      </div>
      <div className={styles.info}>
        <h3>{formatTitle(title)}</h3>
        {view === 'books' && (
          <div className={styles.options}>
            <Link href={`/books/${slug.current}`}>Info</Link>
            {buy_link && <a href={buy_link} target="_blank" rel="noreferrer">Buy the Book</a>}
          </div>
        )}
      </div>
    </div>
  )
}

export default BookItem