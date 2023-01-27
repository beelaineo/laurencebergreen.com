import * as React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { SanityBlock, SanityDocument, SanityImageAsset, SanityImageCrop, SanityImageHotspot, SanityKeyed, SanityReference, SanityFile } from '../sanity-schema'
import { NotFound } from '../components/not-found'
import { PortableText } from '@portabletext/react'
import styles from '../styles/About.module.css'
import sanityClient from '../sanityClient'
import Img from 'next/image'
import Image from 'next/image'
import { useNextSanityImage, UseNextSanityImageProps } from 'next-sanity-image'
import { linkSync } from 'fs'
import LinkIcon from '../components/icon-link'
import { Parallax } from 'react-scroll-parallax'
import { collapseTextChangeRangesAcrossMultipleVersions, isConstructorDeclaration, visitEachChild } from 'typescript'
import AwardItem from '../components/award-item'

type AwardType = {
  title?: string
  subtitle?: string
  link?: string
}

interface AboutType extends SanityDocument {
  _type: "about"
  title?: string
  image?: {
    _type: "image"
    asset: SanityReference<SanityImageAsset>
    crop?: SanityImageCrop
    hotspot?: SanityImageHotspot
  }
  intro?: string
  body?: Array<SanityKeyed<SanityBlock>>
  awards?: Array<SanityKeyed<AwardType>>
  bio?: { _type: "file"; asset: { url: string } }
}

interface AboutPageProps {
  about: AboutType
}

export default function About ({ about }: AboutPageProps) {
  if (!about) return <NotFound />

  const { title, image, intro, body, awards, bio } = about
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const coverImage: UseNextSanityImageProps = useNextSanityImage(
		sanityClient,
		image
	)

  return (
    <>
      <style jsx global>{`
        body {
        }
      `}</style>
      {image && title && (
        <section className={styles.heading}>
          <Parallax speed={-20} style={{zIndex: 2}}>
          <h1>{title}</h1>
          </Parallax>
        </section>
      )}
      <div className={styles.portrait_wrapper}>
        <div className={styles.portrait}>
        <Img
          src={coverImage.src}
          loader={coverImage.loader}
          alt="Portrait of Laurence Bergreen"
          fill
          style={{ objectFit: 'contain' }}
          className={styles.cover_image}
        />
        </div>
      </div>
      {intro && body && (
        <section className={styles.text}>
          <div className={styles.intro_text}>
            {intro}
          </div>
          <div className={styles.body_text}>
            <PortableText value={body} />
          </div>
        </section>
      )}
      {awards && awards.length > 0 && (
        <section className={styles.awards}>
          <div className={styles.wrapper}>
            <Parallax speed={-10} className={styles.h2_wrapper}><h2>Awards</h2></Parallax>
              {awards.map((award: SanityKeyed<AwardType>, i: number) => (
                <AwardItem key={i} award={award} />
              ))}
          </div>
        </section>
      )}
      {(bio != undefined && bio?.asset != undefined) && (
        <section className={styles.bio}>
          <a href={bio.asset.url} target="_blank" rel="noreferrer">Download Author Bio (PDF)</a>
        </section>
      )}
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  
  const about = await sanityClient.fetch(`*[_type == "about"][0] {
    ...,
    bio {
      asset->
    }
  }`)
  return {
    props: {
      about,
    },
    revalidate: 10
  }
}
