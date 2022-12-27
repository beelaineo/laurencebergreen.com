import * as React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { Book as BookType } from '../../sanity-schema'
import { NotFound } from '../../components/not-found'
import { PortableText } from '@portabletext/react'
import styles from '../../styles/Book.module.css'
import sanityClient from '../../sanityClient'
import Img from 'next/image'
import Image from 'next/image'
import { useNextSanityImage, UseNextSanityImageProps } from 'next-sanity-image'
import BookCoverBG from '../../components/cover-bg'
import ReviewItem from '../../components/review-item'
import Arrow from '../../components/icon-arrow'
import GalleryItem from '../../components/gallery-item'
import { linkSync } from 'fs'
import LinkIcon from '../../components/icon-link'
import { Parallax } from 'react-scroll-parallax'
import { visitEachChild } from 'typescript'

interface BookPageProps {
  book?: BookType
}

export default function Book ({ book }: BookPageProps) {
  
  const { title, slug, intro, cover, color, date, visit, accolades, publishers, buy_link, sellers, reviews, excerpt, gallery, links } = book
  const coverImage: UseNextSanityImageProps = useNextSanityImage(
		sanityClient,
		cover
	)

  const formattedDate = new Date(date).toLocaleDateString('en-US', {'month': 'long', 'day': 'numeric', 'year': 'numeric'})
  const bookColor = color ? color : '#8E2D2D';

  return (
    <>
      <style jsx global>{`
        body {
          background-color: ${bookColor};
        }
      `}</style>
      {cover && title && (
        <section className={styles.hero}>
          <Parallax speed={-20} style={{zIndex: 2}}>
          <h1>{title}</h1>
          </Parallax>
          <div className={styles.cover_wrapper}>
            <Img
              src={coverImage.src}
              loader={coverImage.loader}
              alt="hero image"
              fill
              style={{ objectFit: 'contain' }}
              className={styles.cover_image}
            />
            <BookCoverBG color={bookColor} />
        </div>
        </section>
      )}
      {intro && intro.length > 0 && (
        <section className={styles.intro}>
          <PortableText value={intro} />
        </section>
      )}
      <section className={styles.meta}>
        {date && (
          <div className={styles.date}>
            <h4>Publish Date</h4>
            {formattedDate}
          </div>
        )}
        {publishers?.length > 0 && (
          <div className={styles.publishers}>
            <h4>Publishers</h4>
            {publishers.map(publisher => (publisher.title)).join('\n')}
          </div>
        )}
        {accolades?.length > 0 && (
          <div className={styles.accolades}>
            <h4>Accolades</h4>
            {accolades.map(a => (a.title)).join('\n')}
          </div>
        )}
      </section>
      {(visit?.url != undefined && visit?.title != undefined) && (
        <section className={styles.visit}>
          <a href={visit.url}>{visit.title}</a>
        </section>
      )}
      {sellers && sellers.length > 0 && (
        <section className={styles.buy}>
          <Parallax speed={-5} style={{zIndex: 2}}>
          <h2>Buy the Book</h2>
          </Parallax>
          <div className={styles.grid}>
            <div className={styles.hc}>
              <h3>Hardcover</h3>
              {sellers?.filter((s)=>s.category == 'hardcover').map((seller) => (
                <a key={seller._key} href={seller.url} target="_blank" rel="noreferrer">{seller.title}</a>
              ))}
            </div>
            <div className={styles.pb}>
              <h3>Paperback</h3>
              {sellers?.filter((s)=>s.category == 'paperback').map((seller) => (
                <a key={seller._key} href={seller.url} target="_blank" rel="noreferrer">{seller.title}</a>
              ))}
            </div>
            <div className={styles.eb}>
              <h3>Ebook</h3>
              {sellers?.filter((s)=>s.category == 'ebook').map((seller) => (
                <a key={seller._key} href={seller.url} target="_blank" rel="noreferrer">{seller.title}</a>
              ))}
            </div>
          </div>
        </section>
      )}
      {reviews && reviews.length > 0 && (
        <section className={styles.reviews}>
          <Parallax speed={-5} style={{zIndex: 2}}>
            <h2>Reviews</h2>
          </Parallax>
          <div className={styles.arrow_icon}>
            <Arrow />
          </div>
          <div className={styles.grid}>
            {reviews.map((review) => (
              <ReviewItem key={review._key} review={review} />
            ))}
          </div>
        </section>
      )}
      {excerpt && (
        <section className={styles.excerpt}>
          <Parallax speed={-5} style={{zIndex: 2}}>
            <h2>Book Excerpt</h2>
          </Parallax>
          <div className={styles.text_wrapper}>
            <PortableText value={excerpt.text} />
            <a className={styles.more_btn}>More</a>
            <div className={styles.text_more}>
              <PortableText value={excerpt.text_more} />
            </div>
          </div>
        </section>
      )}
      {gallery && gallery.images.length > 0 && (
        <section className={styles.gallery}>
          <Parallax speed={-5} style={{zIndex: 2}}>
            <h2>{gallery.title}</h2>
          </Parallax>
          <div className={styles.arrow_icon}>
            <Arrow />
          </div>
          <div className={styles.grid}>
            {gallery.images.map((image) => (
              <GalleryItem key={image._key} image={image.image} caption={image.caption} color={color} />
            ))}
          </div>
        </section>
      )}
      {links && links.length > 0 && (
        <section className={styles.links}>
          <Parallax speed={-5} style={{zIndex: 2}}>
            <h2>Links</h2>
          </Parallax>
          <div className={styles.list}>
            {links.map((link) => (
              <a key={link._key} href={link.url} target="_blank" rel="noreferrer">{link.title} <LinkIcon /></a>
            ))}
          </div>
        </section>
      )}
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { params } = ctx
  if (!params?.slug)
    return { props: { book: undefined } }

  const handle = getParam(params.slug)
  
  const book = await sanityClient.fetch(`*[_type == "book" && slug.current == "${handle}"][0] {
    ...,
    gallery {
      title,
      images[] {
        caption,
        'image': image.asset->
      }
    }
  }`)
  return {
    props: {
      book,
    },
  }
}

function definitely<T>(items?: Array<T | null | undefined> | null): T[] {
  if (!items) return []
  return items.filter((i): i is T => Boolean(i))
}

const getParam = (param: string | string[]): string => {
  if (typeof param === 'string') return param
  const last = param[param.length - 1]
  return last.replace('.json', '')
}

export const getStaticPaths: GetStaticPaths = async () => {
  const result: BookType[] = await sanityClient.fetch(`*[_type == "book"]`)
  const books = definitely(result)
  const paths = books.map((book: BookType) => ({
    params: {
      slug: book.slug.current ? book.slug.current : undefined,
      updatedAt: book?._updatedAt?.toString(),
    },
  }))

  return {
    paths: paths,
    fallback: true,
  }
}
