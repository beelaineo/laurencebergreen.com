import * as React from 'react'
const { useState } = React
import { Post as PostType } from '../sanity-schema'
import styles from '../styles/NewsItem.module.css'
import Img from 'next/image'
import { useNextSanityImage, UseNextSanityImageProps } from 'next-sanity-image'
import sanityClient from '../sanityClient'
import LinkIcon from './icon-link'

interface NewsItemProps {
  post: PostType
}

const NewsItem = ({ post }: NewsItemProps) => {
  const { title, date, text, cover, link } = post
  const imgProps: UseNextSanityImageProps = useNextSanityImage(
		sanityClient,
		cover
	)
  console.log('imgProps', imgProps)

  return (
    <div className={styles.item}>
      <a className={styles.cover_wrapper} href={link ? link : null} target="_blank" rel="noopener, noreferrer">
        {imgProps?.src && (
          <Img
            src={imgProps.src}
            loader={imgProps.loader}
            alt="hero image"
            fill
            className={styles.cover_image}
          />
        )}
         <style jsx>{`
          .cover-bg {
            position: absolute;
            z-index: -1;
            height: 100%;
            width: 100%;
            top: 0;
            bottom: 0;
            background-color: rgba(142, 45, 45, 1);
          }
        `}</style>
        <div className="cover-bg"></div>
        {link && (
        <div className={styles.share_btn}>
          <LinkIcon />
        </div>
        )}
      </a>
      <h3>{title}</h3>
      <div className={styles.text}>
        {text}
      </div>
    </div>
  )
}

export default NewsItem