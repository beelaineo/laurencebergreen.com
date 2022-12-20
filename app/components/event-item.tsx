import * as React from 'react'
const { useState } = React
import { Homepage as HomepageType } from '../sanity-schema'
import styles from '../styles/EventItem.module.css'

interface EventItemProps {
  event: HomepageType['events'][0]
}

const EventItem = ({ event }: EventItemProps) => {
  const { title, place, subtitle, datetime, timezone, titledLink } = event

  const date = new Date(datetime).toLocaleDateString('en-us', {month:"long", day:"numeric"}) 
  const time = new Date(datetime).toLocaleTimeString('en-us', {hour:"numeric"}).toLowerCase().replace(' ', '')
  
return (
    <div className={styles.item}>
      <h3>{place}</h3>
      <div className={styles.info}>
        {title}<br />
        <span>{subtitle}</span>
        {titledLink?.url ? <a href={titledLink?.url} target="_blank" rel="noopener noreferrer">{titledLink.title}</a> : null}
      </div>
      <div className={styles.date}>{date}<br/><span>{time} {timezone}</span></div>
    </div>
  )
}

export default EventItem