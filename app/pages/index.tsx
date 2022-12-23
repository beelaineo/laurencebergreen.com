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
import { motion } from "framer-motion"
import React, {useRef, useEffect} from 'react'

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
  console.log('homepage doc', homepage)

  const [loading, setLoading] = React.useState(true)
  const [showImage, setShowImage] = React.useState(false)
  const [showSticker, setShowSticker] = React.useState(false)

  const heroImg: UseNextSanityImageProps = useNextSanityImage(
		sanityClient,
		homepage.hero_image
	)
  const heroTextRows = homepage.hero_text.split('\n')

  const stickerChars = homepage.sticker_text.split('')
  const arc = 360
  const degree = arc / stickerChars.length
  const radius = 220

  useEffect(() => {
    const loadingTimer = setTimeout(() => {setLoading(false), 1000})
    const imageTimer = setTimeout(() => {setShowImage(true), 2000})
    const stickerTimer = setTimeout(() => {setShowSticker(true), 5000})
    return () => {
      clearTimeout(loadingTimer)
      clearTimeout(imageTimer)
      clearTimeout(stickerTimer)
    }
  }, [])

useEffect(() => {
  console.log('loading:', loading, )
}, [loading])
useEffect(() => {
  console.log('showImage:', showImage)
}, [showImage])
useEffect(() => {
  console.log('showSticker:', showSticker)
}, [showSticker])


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
    hidden: { opacity: 0, y: 0 },
    show: {
      opacity: 1,
      y: -16, 
    },
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
        {showImage == true && (
          <Img
            src={heroImg.src}
            loader={heroImg.loader}
            alt="hero image"
            width={heroImg.width}
            height={heroImg.height}
            className={styles.hero_image}
            style={{ objectFit: 'cover' }}
          />
        )}
          <Parallax speed={-20}>
            <motion.div animate={loading ? "hidden" : "show"} variants={heroVariants} className={styles.hero_text}>
              <h1>
                {heroTextRows.map ((line: string, index: number) => (
                  <motion.p variants={headingVariant} key={index}>{line}</motion.p>
                ))}
              </h1>
            </motion.div>
          </Parallax>
          {showSticker == true && (
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
        <section className={styles.recent}>
          <Parallax speed={-10} style={{zIndex: 2}}>
            <h2>Recent Publications</h2>
          </Parallax>
            <div className={styles.books}>
              {homepage.books.map((book: BookType) => (
                  <BookItem key={book._id} book={book} />
              ))}
            </div>
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
          <div className={styles.arrow_icon}>
            <Arrow />
          </div>
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
  }
}
