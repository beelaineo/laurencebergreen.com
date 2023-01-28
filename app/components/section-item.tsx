import * as React from 'react'
import { SanityKeyed } from 'sanity-codegen'
const { useState } = React
import styles from '../styles/SectionItem.module.css'
import ContactIcon from './icon-contact'

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

interface SectionItemProps {
  section?: SectionType
}


const SectionItem = ({ section }: SectionItemProps) => {
  const { title, entries } = section

return (
    <div className={styles.item}>
      <h3>{title}</h3>
      {entries && entries.length > 0 && (
        <div className={styles.entries}>
          {entries.map((entry: SanityKeyed<EntryType>, i: number) => (
            <div key={i} className={styles.entry}>
              <ContactIcon />
              <div className={styles.info}>
                <span>{entry.title}</span><br />
                {entry.email}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SectionItem