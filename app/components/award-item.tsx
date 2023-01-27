import * as React from 'react'
const { useState } = React
import styles from '../styles/AwardItem.module.css'

type AwardType = {
  title?: string
  subtitle?: string
  link?: string
}

interface AwardItemProps {
  award: AwardType
}

const AwardItem = ({ award }: AwardItemProps) => {
  const { title, subtitle, link } = award

return (
    <div className={styles.item}>
      <h3>{title}</h3>
      <div className={styles.info}>
        {subtitle}<br />
      </div>
    </div>
  )
}

export default AwardItem