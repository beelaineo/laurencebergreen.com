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
import React, {useRef, useEffect} from 'react'
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
  const [loading, setLoading] = React.useState(true)
  const [showHeading, setShowHeading] = React.useState(false)
  const [showImage, setShowImage] = React.useState(false)
  const [showSticker, setShowSticker] = React.useState(false)
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

// useEffect(() => {
//   console.log('loading:', loading, )
// }, [loading])
// useEffect(() => {
//   console.log('showImage:', showImage)
// }, [showImage])
// useEffect(() => {
//   console.log('showSticker:', showSticker)
// }, [showSticker])

// when recent section is at bottom of screen, scroll horizontally to end of books row 
  const recentRef = useRef(null)
  const booksRef = useRef(null)

  const recentIsInView = useInView(recentRef)

  // useEffect(() => {
  //   const recentObserver = new IntersectionObserver((entries) => {
  //     if (entries[0].isIntersecting) {
  //       booksRef.current.scrollLeft = booksRef.current.scrollWidth
  //     }
  //   }, {threshold: 1})
  //   recentObserver.observe(recentRef.current)
  //   return () => {
  //     recentObserver.disconnect()
  //   }
  // }, [])

  const heroVariants = {
    hidden: { opacity: 0, y: -16 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.25
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
      }
    },
  }

  const recentVariant = { hidden: { opacity: 0, y: 20 } }

  const recentVariants: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.3, type: "spring", stiffness: 300, damping: 24 }
    },
    hidden: { opacity: 0, y: 20, transition: { duration: 0.2 } }
  }

  return (
    <>
      <Head>
        <title>Laurence Bergreen</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
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
            <h2>Recent Publications</h2>
          </Parallax>
            <motion.div animate={recentIsInView ? 'visible' : 'hidden'} variants={recentVariants} className={styles.books} ref={booksRef} onTouchMove={(e) => e.preventDefault()}>
              {homepage.books.map((book: BookType) => (
                <motion.div className={styles.book_item_wrapper} key={book._id} variants={recentVariants}>
                  <BookItem book={book} view="home" />
                </motion.div>
              ))}
            </motion.div>
          <div className={styles.background}>
            <div className={styles.shelf}></div>
            <div className={styles.shelf}></div>
          </div>
        </section>
        <section className={styles.events}>
          <div className={styles.wrapper}>
            <Parallax speed={-10} className={styles.h2_wrapper}><h2>Speaking Engagements</h2></Parallax>
              {homepage.events.map((event: SanityKeyed<EventType>, i: number) => (
                <EventItem key={i} event={event} />
              ))}
          </div>
        </section>
        <section className={styles.news}>
          <Parallax speed={-10} className={styles.h2_wrapper}>News</Parallax>
          <Parallax speed={-10} className={styles.arrow_icon}>
            <Arrow />
          </Parallax>
          <div className={styles.wrapper}>
            {homepage.news.map((post: SanityKeyed<Post>, i: number) => (
              <NewsItem key={i} post={post} />
            ))}
          </div>
        </section>
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
