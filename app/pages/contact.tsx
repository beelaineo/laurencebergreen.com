import * as React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { Contact as ContactType, SanityBlock, SanityDocument, SanityImageAsset, SanityImageCrop, SanityImageHotspot, SanityKeyed, SanityReference, SanityFile } from '../sanity-schema'
import { NotFound } from '../components/not-found'
import styles from '../styles/Contact.module.css'
import sanityClient from '../sanityClient'
import { linkSync } from 'fs'
import LinkIcon from '../components/icon-link'
import { Parallax } from 'react-scroll-parallax'
import { collapseTextChangeRangesAcrossMultipleVersions, isConstructorDeclaration, visitEachChild } from 'typescript'
import SectionItem from '../components/section-item'

interface EntryType {
  _type: "entry"
  title?: string
  email?: string
}

interface SectionType {
  _type: "section"
  title?: string
  entries?: Array<SanityKeyed<EntryType>>
}

interface ContactPageProps {
  contact: ContactType
}

export default function Contact ({ contact }: ContactPageProps) {
  if (!contact) return <NotFound />

  const { title, sections } = contact

  return (
    <>
      <style jsx global>{`
        body {
        }
      `}</style>
      {title && (
        <section className={styles.heading}>
          <Parallax speed={-10} style={{zIndex: 2}}>
          <h1>{title}</h1>
          </Parallax>
        </section>
      )}
      {sections && sections.length > 0 && (
        <section className={styles.sections}>
          <div className={styles.wrapper}>
              {sections.map((section: SanityKeyed<SectionType>, i: number) => (
                <SectionItem key={i} section={section} />
              ))}
          </div>
        </section>
      )}
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  
  const contact = await sanityClient.fetch(`*[_type == "contact"][0] {
    ...
  }`)
  return {
    props: {
      contact,
    },
    revalidate: 10
  }
}
