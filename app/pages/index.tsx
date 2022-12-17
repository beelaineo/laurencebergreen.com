import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { createClient } from 'next-sanity'
import { Post } from '../sanity-schema'
import { SanityKeyed } from 'sanity-codegen'
import { Book as BookType } from '../sanity-schema'

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T
type Props = UnwrapPromise<ReturnType<typeof getStaticProps>>['props']

interface EventType {
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

  const heroTextRows = homepage.hero_text.split('\n')

  const stickerChars = homepage.sticker_text.split('')
  const arc = 360
  const degree = arc / stickerChars.length
  const radius = 220

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
          <Image
            src={homepage.hero_image?.asset.url}
            alt="hero image"
            width={homepage.hero_image?.asset.metadata.dimensions.width}
            height={homepage.hero_image?.asset.metadata.dimensions.height}
            className={styles.hero_image}
          />
          <div className={styles.hero_text}>
            <h1>
              {heroTextRows.map ((line: string, index: number) => (
                <p key={index}>{line}</p>
              ))}</h1>
          </div>
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
        </section>
        <section className={styles.recent}>
          <h2>Recent Publications</h2>
            {homepage.books.map((book: BookType) => (
              <div key={book._id} className={styles.book}>
                <h3>{book.title}</h3>
              </div>
            ))}
          <div className={styles.shelf}></div>
          <div className={styles.shelf}></div>
        </section>
        <section className={styles.events}>
          <h2>Speaking Engagements</h2>
            {homepage.events.map((event: SanityKeyed<EventType>, i: number) => (
              <div key={i} className={styles.event}>
                <h3>{event?.title}</h3>
              </div>
            ))}
          <div className={styles.shelf}></div>
          <div className={styles.shelf}></div>
        </section>
        <section className={styles.news}>
          <h2>News</h2>
            {homepage.news.map((post: SanityKeyed<Post>, i: number) => (
              <div key={i} className={styles.event}>
                <h3>{post?.title}</h3>
              </div>
            ))}
          <div className={styles.shelf}></div>
          <div className={styles.shelf}></div>
        </section>
      </main>
    </>
  )
}

const client = createClient({
  projectId: 'oebpyzcq',
  dataset: 'production',
  apiVersion: '2022-12-16',
  useCdn: false,
})

export async function getStaticProps() {
  const homepage = await client.fetch(`*[_type == "homepage"][0]{
    ...,
    books[]->,
    events[],
    news[0..9],
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
