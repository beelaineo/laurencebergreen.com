import Head from 'next/head'
import Img from 'next/image'
import { useNextSanityImage, UseNextSanityImageProps } from 'next-sanity-image'
import styles from '../styles/Home.module.css'
import sanityClient from '../sanityClient'
import { Post } from '../sanity-schema'
import { SanityKeyed } from 'sanity-codegen'
import { Book as BookType } from '../sanity-schema'
import BookItem from '../components/book-item'
import EventItem from '../components/event-item'
import NewsItem from '../components/news-item'
import Arrow from '../components/icon-arrow'
import { Parallax } from 'react-scroll-parallax'
import { motion, useScroll, useInView, Variants } from "framer-motion"
import useWindowDimensions from '../hooks/useWindowDimensions'
import React, {useRef, useEffect, useState} from 'react'
import { useMenu } from '../providers/menu-provider'

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>['props']

interface EventType {
  _type: "event"
  title?: string
  place?: string
  subtitle?: string
  datetime?: string
  titledLink?: {
    _type: 'titledLink'
    title?: string
    url?: string
  }
}

export default function Homepage({ homepage }: Props) {
  const [loading, setLoading] = useState(true)
  const [showHeading, setShowHeading] = useState(false)
  const [showImage, setShowImage] = useState(false)
  const [showSticker, setShowSticker] = useState(false)
  const [recentIntersectBottom, setRecentIntersectBottom] = useState(false)
  const [lastBookIntersect, setLastBookIntersect] = useState(false)
  const { width, height } = useWindowDimensions()
  const heroImg: UseNextSanityImageProps = useNextSanityImage(
		sanityClient,
		homepage.hero_image
	)
  const heroTextRows = homepage.hero_text.split('\n')

  const stickerChars = homepage.sticker_text.split('')
  const arc = 360
  const degree = arc / stickerChars.length
  const radius = width < 1024 ? 58 : width < 1920 ? 110 : 220

  const { resetMenuColor } = useMenu()

  // when recent section is at bottom of screen, scroll horizontally to end of books row 
  const mainRef = useRef(null)
  const recentRef = useRef(null)
  const booksRef = useRef(null)
  const lastBookRef = useRef(null)
  const eventsRef = useRef(null)
  const newsRef = useRef(null)

  const recentIsInView = useInView(recentRef)
  const eventsIsInView = useInView(eventsRef)
  const newsIsInView = useInView(newsRef)
  
  useEffect(() => {
    resetMenuColor()
    const loadingTimer = setTimeout(() => {setLoading(false), 500})
    const headingTimer = setTimeout(() => {setShowHeading(true), 3000})
    const imageTimer = setTimeout(() => {setShowImage(true), 1000})
    const stickerTimer = setTimeout(() => {setShowSticker(true), 5000})

    return () => {
      clearTimeout(loadingTimer)
      clearTimeout(imageTimer)
      clearTimeout(stickerTimer)
      clearTimeout(headingTimer)
    }
  }, [])

  //@ts-ignore
  const callBackFunctionRecent = (entries) => {
    const [ entry ] = entries
    console.log('RECENT INTERSECTION ENTRY', entry)
    setRecentIntersectBottom(entry.isIntersecting)
  }

  useEffect(() => {
    const recent = recentRef.current
    const recentOptions = {
      //@ts-ignore
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    }

    const recentObserver = new IntersectionObserver(callBackFunctionRecent, recentOptions)
    if (recent) recentObserver.observe(recent)

    return () => {
      if(recent) recentObserver.unobserve(recent)
    }
  }, [recentRef])

  useEffect(() => {
    const books = booksRef.current
    const recent = recentRef.current
    const last = lastBookRef.current

      const { scrollTop, scrollHeight, clientHeight } = recent
      if (scrollTop + clientHeight == scrollHeight) {
        console.log('recent div', recent)
        console.log('Reached bottom')
        setRecentIntersectBottom(true)
      } else {
        setRecentIntersectBottom(false)
      }

  }, [recentRef, lastBookRef, booksRef])

  useEffect(() => {
    const container = mainRef.current
    if (recentIntersectBottom) {
      console.log('scrolling books, intersecting bottom!')
      container.addEventListener('wheel', handleScroll)
    }
    if (lastBookIntersect) {
      console.log('at the end! cancel scroll handler')
      container.removeEventListener('wheel', handleScroll)
    }
    return () => {
      container.removeEventListener('wheel', handleScroll)
    }
  }, [recentIntersectBottom, lastBookIntersect])

  const handleScroll = (ev: WheelEvent) => {
    const last = lastBookRef.current
    const books = booksRef.current
    const { offsetLeft, offsetParent, clientWidth } = last
    const lastBookRect = last.getBoundingClientRect()
    const booksRect = books.getBoundingClientRect()
    const booksStyle = window.getComputedStyle(books)
    const lastBookStyle = window.getComputedStyle(last)
    const booksPaddingRight = parseInt(booksStyle.paddingRight)
    const lastBookMarginRight = parseInt(lastBookStyle.marginRight)
    const offset = lastBookRect.right - booksRect.right
    // console.log('BOOKS OFFSET', offset)
    // console.log('BOOKS PADDING + BOOK MARGIN', booksPaddingRight + lastBookMarginRight)
    if (offset + booksPaddingRight + lastBookMarginRight == 0) console.log('reached end of books!')
    if (offset + booksPaddingRight + lastBookMarginRight == 0) {
      setLastBookIntersect(true)
    } else {
      console.log('not at end of books')
      setLastBookIntersect(false)
    }

    console.log('EVENT', ev)
    console.log('DELTAY', ev.deltaY)
    ev.preventDefault()
    booksRef.current.scrollLeft += ev.deltaY
  }

  const heroVariants = {
    hidden: { opacity: 0, y: -16 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.25,
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
  }
  const headingVariant = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0, 
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
  }

  const recentVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }

  const newsVariants: Variants = {
    visible: {
      opacity: 1,
      transition: { delayChildren: 0.33, staggerChildren: 0.3, type: "spring", stiffness: 300, damping: 24 }
    },
    hidden: { opacity: 0, transition: { duration: 0.2 } }
  }

  return (
    <>
      <Head>
        <title>Laurence Bergreen</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main} ref={mainRef}>
        <section className={styles.hero}>
        {loading == false && showImage == true && (
          <Img
            src={heroImg.src}
            loader={heroImg.loader}
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 80vw, (max-width: 1919px) 80vw, 80vw"
            alt="hero image"
            width={heroImg.width}
            height={heroImg.height}
            className={styles.hero_image}
            style={{ objectFit: 'cover' }}
            priority
          />
        )}
          <Parallax speed={-10}>
            <motion.div animate={!loading && showHeading ? "show" : "hidden"} variants={heroVariants} className={styles.hero_text}>
              <h1>
                {heroTextRows.map ((line: string, index: number) => (
                  <motion.p variants={headingVariant} key={index}>{line}</motion.p>
                ))}
              </h1>
            </motion.div>
          </Parallax>
          {!loading && showSticker == true && (
          <h3 className={styles.sticker}>
            {stickerChars.map((char: string, i: number) => (
              <span
                key={`heading-span-${i}`}
                style={{
                  height: `${radius}px`,
                  transform: `rotate(${degree * i - arc / 2}deg)`,
                  transformOrigin: `0 ${radius}px 0`,
                }}>
                {char}
              </span>
            ))}
          </h3>
          )}
        </section>
        <section className={styles.recent} ref={recentRef}>
          <Parallax speed={-10} style={{zIndex: 2}}>
            <motion.h2 animate={recentIsInView ? 'visible' : 'hidden'} variants={recentVariants}>Recent Publications</motion.h2>
          </Parallax>
            <div className={styles.books} ref={booksRef} onTouchMove={(e) => e.preventDefault()}>
              {homepage.books.map((book: BookType, i: number) => (
                <div className={styles.book_item_wrapper} key={book._id} ref={i + 1 == homepage.books.length ? lastBookRef : null}>
                  <BookItem book={book} view="home" />
                </div>
              ))}
            </div>
          <div className={styles.background}>
            <div className={styles.shelf}></div>
            <div className={styles.shelf}></div>
          </div>
        </section>
        <section className={styles.events} ref={eventsRef}>
          <motion.div className={styles.wrapper} animate={eventsIsInView ? 'visible' : 'hidden'} variants={newsVariants}>
            <Parallax speed={-10} className={styles.h2_wrapper}><h2>Speaking Engagements</h2></Parallax>
              {homepage.events.map((event: SanityKeyed<EventType>, i: number) => (
                <motion.div key={i} variants={newsVariants}>
                  <EventItem event={event} />
                </motion.div>
              ))}
          </motion.div>
        </section>
        <motion.section animate={newsIsInView ? 'visible' : 'hidden'} variants={newsVariants} className={styles.news} ref={newsRef}>
          <motion.div variants={newsVariants}>
          <Parallax speed={-10} className={styles.h2_wrapper}>News</Parallax>
          <Parallax speed={-10} className={styles.arrow_icon}>
            <Arrow />
          </Parallax>
          </motion.div>
          <div className={styles.wrapper}>
            {homepage.news.map((post: SanityKeyed<Post>, i: number) => (
              <motion.div key={i} variants={newsVariants}>
                <NewsItem post={post} />
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const homepage = await sanityClient.fetch(`*[_type == "homepage"][0]{
    ...,
    books[]->,
    events[],
    news[] {
      ...,
      cover {
        ...,
        asset->
      }
    },
    hero_image {
      asset->
    }
  }`)

  return {
    props: {
      homepage,
    },
    revalidate: 10
  }
}
