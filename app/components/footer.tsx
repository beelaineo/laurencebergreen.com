import * as React from 'react'
import Link from 'next/link'
import styles from '../styles/Footer.module.css'
import sanityClient from '../sanityClient'
import { SanityKeyed } from 'sanity-codegen'
import { Parallax } from 'react-scroll-parallax'

const { useEffect, useState } = React

interface FooterLinkType {
  slug: string
  title: string
}

interface SocialType {
  title: string
  url: string
}

export default function Footer() {
  const [settings, setSettings] = useState(null)
  const year = new Date().getFullYear()

  useEffect(() => {
    async function fetchData() {
      const ss = await sanityClient.fetch(`*[_type == "settings"][0]{
        ...,
        footer_links[] {
          title,
          'slug': coalesce(page->slug.current, '')
        }
      }`)
      console.log(ss)
      setSettings(ss)
    }
    fetchData()
  }, [])

  return (
    <footer className={styles.footer}>
      <div className={styles.socials}>
        {settings?.socials_title && <Parallax speed={-10} className={styles.h2}>{settings.socials_title}</Parallax>}
        {settings?.socials.map((item: SanityKeyed<SocialType>, i: number) => (
            <Link key={i} href={item.url} target="_blank">{item.title}</Link>
          )
          )}
      </div>
      <div className={styles.wrapper}>
        <nav className={styles.nav}>
          {settings?.footer_links.map((item: SanityKeyed<FooterLinkType>, i: number) => (
            <Link key={i} href={item.slug == '' ? '/' : '/' + item.slug}>{item.title}</Link>
          )
          )}
        </nav>
        <div className={styles.copyright}>{settings?.copyright && settings?.copyright} {year}</div>
        <a className={styles.credit} href={settings?.credit.url} target="_blank" rel="noreferrer">{settings?.credit.text}</a>
      </div>
    </footer>
  )
}
