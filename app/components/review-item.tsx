import { PortableText, PortableTextBlockComponent } from '@portabletext/react'
import * as React from 'react'
import { SanityBlock, SanityKeyed } from 'sanity-codegen'
import styles from '../styles/ReviewItem.module.css'
import LinkIcon from './icon-link'

interface ReviewType {
  _type: "review"
  source?: string
  quote?: Array<SanityKeyed<SanityBlock>>
  url?: string
}

interface ReviewItemProps {
  review: ReviewType
}

const ReviewItem = ({ review }: ReviewItemProps) => {
  const { source, quote, url } = review

  return (
    <div className={styles.review_item}>
      <h3>{source}</h3>
      <blockquote><PortableText value={quote} /></blockquote>
      {url && (
        <div className={styles.link}>
          <a href={url}>
            <LinkIcon />
          </a>
        </div>
      )}
    </div>
  )
}

export default ReviewItem