import * as React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { Page as PageType, SanityBlock } from '../../sanity-schema'
import { NotFound } from '../../components/not-found'
import { PortableText } from '@portabletext/react'
import styles from '../../styles/Page.module.css'
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
import { collapseTextChangeRangesAcrossMultipleVersions, isConstructorDeclaration, visitEachChild } from 'typescript'
import { useMenu } from '../../providers/menu-provider'

interface PageProps {
  page: PageType
}

export default function Page ({ page }: PageProps) {
  const { resetMenuColor } = useMenu()

  if (!page) return <NotFound />

  const { title, slug, body } = page

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    resetMenuColor()
  }, [])

  return (
    <>
      {title && (
        <section className={styles.heading}>
          <Parallax speed={-10} style={{zIndex: 2}}>
          <h1>{title}</h1>
          </Parallax>
        </section>
      )}
      {body && body?.length > 0 && (
        <section className={styles.body}>
          <PortableText value={body} />
        </section>
      )}
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { params } = ctx
  if (!params?.slug)
    return { props: { page: undefined } }

  const handle = getParam(params.slug)
  
  const page = await sanityClient.fetch(`*[_type == "page" && slug.current == "${handle}"][0] {
    ...
  }`)
  return {
    props: {
      page,
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
  const result: PageType[] = await sanityClient.fetch(`*[_type == "page"]`)
  const pages = definitely(result)
  const paths = pages.map((page: PageType) => ({
    params: {
      slug: page.slug.current ? page.slug.current : undefined,
      updatedAt: page?._updatedAt?.toString(),
    },
  }))

  return {
    paths: paths,
    fallback: true,
  }
}
