import * as React from 'react'
import { SanityImageAsset, SanityReference, SanityImageCrop, SanityImageHotspot } from 'sanity-codegen'
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

interface SanityImageProps {
  image: SanityImageType
  caption?: string
  color?: string
  className?: string
}

const SanityImage = ({ image, caption, color, className, }: SanityImageProps) => {

  const imgProps: UseNextSanityImageProps = useNextSanityImage(
		sanityClient,
		image
	)

  return (
    <Img
      src={imgProps.src}
      loader={imgProps.loader}
      sizes="(max-width: 767px) 100vw, 40vw"
      alt={caption}
      style={{ objectFit: 'cover' }}
      className={className}
      width={imgProps.width}
      height={imgProps.height}
    />
  )
}

export default SanityImage