import * as React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { Book as BookType, SanityBlock } from '../../sanity-schema'
import { NotFound } from '../../components/not-found'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import styles from '../../styles/Book.module.css'
import sanityClient from '../../sanityClient'
import Img from 'next/image'
import Image from 'next/image'
import SanityImage from '../../components/sanity-image'
import { useNextSanityImage, UseNextSanityImageProps } from 'next-sanity-image'
import BookCoverBG from '../../components/cover-bg'
import ReviewItem from '../../components/review-item'
import Arrow from '../../components/icon-arrow'
import GalleryItem from '../../components/gallery-item'
import { linkSync } from 'fs'
import LinkIcon from '../../components/icon-link'
import { Parallax } from 'react-scroll-parallax'
import { useMenu } from '../../providers/menu-provider'
import { collapseTextChangeRangesAcrossMultipleVersions, isConstructorDeclaration, visitEachChild } from 'typescript'
const { useEffect, useState, useRef } = React

interface BookPageProps {
  book: BookType
}

export default function Book ({ book }: BookPageProps) {
  const [showExcerpt, setShowExcerpt] = useState(false)
  const { updateMenuColor } = useMenu()
  const { asPath } = useRouter()
  const headingRef = useRef(null)

  const coverImage: UseNextSanityImageProps = useNextSanityImage(
		sanityClient,
		book?.cover
	)
  
  useEffect(() => {
    if (!book) return
    console.log('useEffect book color:', book.color)
    updateMenuColor(book.color)
    headingRef.current.focus()
  }, [])

  useEffect(() => {
    if (!book) return
    console.log('useEffect asPath book color:', book.color)
    updateMenuColor(book.color)
    headingRef.current.focus()
  }, [asPath])

  if (!book) return <NotFound />

  const { title, slug, intro, intro_gallery, cover, category, color, date, visit, accolades, publishers, buy_link, sellers, reviews, excerpt, gallery, links } = book

  const handleMore = () => {
    console.log('click more')
    setShowExcerpt(true)
  }

  // React component that toggles the visibility of the excerpt
  const ReadMoreButton = (props:{onClick:()=>void}) => {
    return (
        <button className={styles.read_more} onClick={props.onClick}>More</button>
    )
  }

  const truncate = (pt: SanityBlock[]) => {
    if (!pt) return null
    const sliceChildren = (item: any, dividerIndex: number) => {
      return {
        ...item,
        children: item.children.slice(0, dividerIndex + 1)
      }
    }
  
    const blockIndex = pt.findIndex((item: any) => item.children.find((i: any) => i._type === 'moreDivider'))
    if (blockIndex == -1) return pt
    const dividerIndex = pt[blockIndex].children.findIndex((item: any) => item._type === 'moreDivider')
    const ptSlicedBlock = pt.map((item: any, i: number) => i == blockIndex ? sliceChildren(item, dividerIndex) : item)
    return ptSlicedBlock.slice(0, blockIndex + 1)
  }

  const truncatedExcerpt = truncate(excerpt?.text)

  const IntroBlock1 = intro.slice(0, 1)
  const IntroBlock2 = intro.slice(1)
  
  const ptComponents = {
    types: {
      moreDivider: () => <ReadMoreButton onClick={handleMore} />
    }
  }

  const ptComponentsMore = {
    types: {
      moreDivider: () => <></>
    }
  }

  const formattedDate = new Date(date).toLocaleDateString('en-US', {'month': 'long', 'day': 'numeric', 'year': 'numeric'})
  const bookColor = color ? color.hex : '#8E2D2D';
  return (
    <>
      <style jsx global>{`
        body {
          background-color: ${bookColor};
        }
      `}</style>
      {cover && title && (
        <section className={styles.hero}>
          <Parallax speed={-10} style={{zIndex: 2}}>
          <h1 ref={headingRef}>{title}</h1>
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
            {category == 'ya_book' ? (
              <div style={{backgroundColor: bookColor, position: 'absolute', zIndex: '-1', height: '100%', width: '100%'}} />
              ) : (
              <BookCoverBG color={bookColor} />
            )}
            <Img
              src={coverImage.src}
              loader={coverImage.loader}
              alt="hero image"
              fill
              style={{ objectFit: 'contain' }}
              className={styles.cover_image_overlay}
            />
        </div>
        </section>
      )}
      {intro && intro?.length > 0 && (
        <section className={styles.intro}>
          <div className={styles.intro_block}>
            {IntroBlock1 && IntroBlock1?.length > 0 && (
              <PortableText value={IntroBlock1} />
            )}
            {intro_gallery && intro_gallery[0] && (
              <Parallax speed={5} className={!intro_gallery[1] ? styles.intro_image_wrapper_single : styles.intro_image_wrapper} style={{backgroundColor: bookColor}}>
                <SanityImage image={intro_gallery[0]} caption={'Intro image'} />
              </Parallax>
            )}
          </div>
          <div className={styles.intro_block}>
            {IntroBlock2 && IntroBlock2?.length > 0 && (
              <PortableText value={IntroBlock2} />
            )}
            {intro_gallery && intro_gallery[1] && (
              <Parallax speed={5} className={styles.intro_image_wrapper} style={{backgroundColor: bookColor}}>
                <SanityImage image={intro_gallery[1]} caption={'Intro image'} />
              </Parallax>
            )}
          </div>
        </section>
      )}
      <section className={styles.meta}>
        {date && (
          <div className={styles.date}>
            <h4>Publish Date</h4>
            <span className="h4">{formattedDate}</span>
          </div>
        )}
        {publishers?.length > 0 && (
          <div className={styles.publishers}>
            <h4>Publishers</h4>
            <span className="h4">{publishers.map(publisher => (publisher.title)).join('\n')}</span>
          </div>
        )}
        {accolades?.length > 0 && (
          <div className={styles.accolades}>
            <h4>Accolades</h4>
            <span className="h4">{accolades.map(a => (a.title)).join('\n')}</span>
          </div>
        )}
      </section>
      {(visit?.url != undefined && visit?.title != undefined) && (
        <section className={styles.visit}>
          <a href={visit.url}>{visit.title}</a>
        </section>
      )}
      {sellers && sellers?.length > 0 && (
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
      {reviews && reviews?.length > 0 && (
        <section className={styles.reviews}>
          <Parallax speed={-5} style={{zIndex: 2}}>
            <h2>Reviews</h2>
          </Parallax>
          {reviews?.length > 2 && (
            <Parallax speed={-5} style={{zIndex: 2}}>
            <div className={styles.arrow_icon}>
              <Arrow />
            </div>
            </Parallax>
          )}
          <div className={styles.grid}>
            {reviews.map((review) => (
              <ReviewItem key={review._key} review={review} />
            ))}
          </div>
        </section>
      )}
      {excerpt && excerpt.text?.length > 0 && (
        <section className={styles.excerpt}>
          <Parallax speed={-5} style={{zIndex: 2}}>
            <h2>Book Excerpt</h2>
          </Parallax>
          <div className={styles.text_wrapper}>
            <div className={!showExcerpt ? styles.show : styles.hidden}>
              <PortableText value={truncatedExcerpt} components={ptComponents} />
            </div>
            <div className={showExcerpt ? styles.show : styles.hidden}>
              <PortableText value={excerpt.text} components={ptComponentsMore} />
            </div>
          </div>
        </section>
      )}
      {gallery && gallery.images?.length > 0 && (
        <section className={styles.gallery}>
          <Parallax speed={-5} style={{zIndex: 2, position: 'relative'}}>
            <h2>{gallery.title}</h2>
          </Parallax>
          <Parallax speed={-5} style={{zIndex: 2, position: 'relative'}}>
          <div className={styles.arrow_icon}>
            <Arrow />
          </div>
          </Parallax>
          <div className={styles.grid}>
            {gallery.images.map((image) => (
              <GalleryItem key={image._key} image={image.image} caption={image.caption} color={bookColor} />
            ))}
          </div>
        </section>
      )}
      {links && links?.length > 0 && (
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
    revalidate: 10
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
