import * as React from 'react'
import { SanityImageAsset, SanityReference, SanityImageCrop, SanityImageHotspot } from 'sanity-codegen'
import styles from '../styles/GalleryItem.module.css'
import Img from 'next/image'
import Image from 'next/image'
import { useNextSanityImage, UseNextSanityImageProps } from 'next-sanity-image'
import sanityClient from '../sanityClient'
 
interface SanityImageType {
  _type: "image";
  asset: SanityReference<SanityImageAsset>;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;
}

interface GalleryItemProps {
  image: SanityImageType
  caption?: string
  color?: string
}

const GalleryItem = ({ image, caption, color }: GalleryItemProps) => {

  const imgProps: UseNextSanityImageProps = useNextSanityImage(
		sanityClient,
		image
	)

  return (
    <>
    <style jsx>{`
      .bg-layer {
        background-color: ${color};
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
      }
    `}</style>
    <div className={styles.gallery_item}>
      <div className={styles.wrapper}>
        <Img
          src={imgProps.src}
          loader={imgProps.loader}
          sizes="(max-width: 767px) 100vw, 33vw"
          alt={caption}
          fill
          style={{ objectFit: 'cover' }}
          className={styles.image}
        />
        <div className='bg-layer' />
        <Img
          src={imgProps.src}
          loader={imgProps.loader}
          sizes="(max-width: 767px) 100vw, 33vw"
          alt={caption}
          fill
          style={{ objectFit: 'cover' }}
          className={styles.image_overlay}
        />
      </div>
    </div>
    </>
  )
}

export default GalleryItem