import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from 'sanity-codegen'

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
}

/**
 * Book
 *
 *
 */
export interface Book extends SanityDocument {
  _type: 'book'

  /**
   * Title — `string`
   *
   *
   */
  title?: string

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: 'slug'; current: string }

  /**
   * Cover Image — `image`
   *
   *
   */
  cover?: {
    _type: 'image'
    asset: SanityReference<SanityImageAsset>
    crop?: SanityImageCrop
    hotspot?: SanityImageHotspot
  }

  /**
   * Theme Color — `string`
   *
   *
   */
  color?: string

  /**
   * Date Published — `date`
   *
   *
   */
  date?: string

  /**
   * Buy Link (default) — `url`
   *
   *
   */
  buy_link?: string

  /**
   * Intro Text — `array`
   *
   *
   */
  intro?: Array<SanityKeyed<SanityBlock>>

  /**
   * Intro Images — `array`
   *
   *
   */
  intro_gallery?: Array<
    SanityKeyed<{
      _type: 'image'
      asset: SanityReference<SanityImageAsset>
      crop?: SanityImageCrop
      hotspot?: SanityImageHotspot
    }>
  >

  /**
   * Publishers — `array`
   *
   *
   */
  publishers?: Array<
    SanityKeyed<{
      _type: 'titledLink'
      /**
       * Title — `string`
       *
       *
       */
      title?: string

      /**
       * URL — `url`
       *
       *
       */
      url?: string
    }>
  >

  /**
   * Accolades — `array`
   *
   *
   */
  accolades?: Array<
    SanityKeyed<{
      _type: 'titledLink'
      /**
       * Title — `string`
       *
       *
       */
      title?: string

      /**
       * URL — `url`
       *
       *
       */
      url?: string
    }>
  >

  /**
   * Visit Button — `object`
   *
   *
   */
  visit?: {
    _type: 'visit'
    /**
     * Title — `string`
     *
     *
     */
    title?: string

    /**
     * URL — `url`
     *
     *
     */
    url?: string
  }

  /**
   * Book Sellers — `array`
   *
   *
   */
  sellers?: Array<
    SanityKeyed<{
      _type: 'seller'
      /**
       * Category — `string`
       *
       *
       */
      category?: 'hardcover' | 'paperback' | 'ebook'

      /**
       * Title — `string`
       *
       *
       */
      title?: string

      /**
       * URL — `url`
       *
       *
       */
      url?: string
    }>
  >

  /**
   * Reviews — `array`
   *
   *
   */
  reviews?: Array<
    SanityKeyed<{
      _type: 'review'
      /**
       * Source — `string`
       *
       *
       */
      source?: string

      /**
       * Quote — `string`
       *
       *
       */
      quote?: string

      /**
       * URL — `url`
       *
       *
       */
      url?: string
    }>
  >

  /**
   * Excerpt — `object`
   *
   *
   */
  excerpt?: {
    _type: 'excerpt'
    /**
     * Text — `array`
     *
     *
     */
    text?: Array<SanityKeyed<SanityBlock>>

    /**
     * More Text — `array`
     *
     *
     */
    text_more?: Array<SanityKeyed<SanityBlock>>
  }

  /**
   * Gallery — `object`
   *
   *
   */
  gallery?: {
    _type: 'gallery'
    /**
     * Title — `string`
     *
     *
     */
    title?: string

    /**
     * Images — `array`
     *
     *
     */
    images?: Array<
      SanityKeyed<{
        _type: 'gallery_image'
        /**
         * Image — `image`
         *
         *
         */
        image?: {
          _type: 'image'
          asset: SanityReference<SanityImageAsset>
          crop?: SanityImageCrop
          hotspot?: SanityImageHotspot
        }

        /**
         * Caption — `string`
         *
         *
         */
        caption?: string
      }>
    >
  }

  /**
   * Links — `array`
   *
   *
   */
  links?: Array<
    SanityKeyed<{
      _type: 'titledLink'
      /**
       * Title — `string`
       *
       *
       */
      title?: string

      /**
       * URL — `url`
       *
       *
       */
      url?: string
    }>
  >
}

/**
 * Homepage
 *
 *
 */
export interface Homepage extends SanityDocument {
  _type: 'homepage'

  /**
   * Title — `string`
   *
   *
   */
  title?: string

  /**
   * Hero Text — `text`
   *
   *
   */
  hero_text?: string

  /**
   * Hero Image — `image`
   *
   *
   */
  hero_image?: {
    _type: 'image'
    asset: SanityReference<SanityImageAsset>
    crop?: SanityImageCrop
    hotspot?: SanityImageHotspot
  }

  /**
   * Sticker Text — `string`
   *
   *
   */
  sticker_text?: string

  /**
   * Recent Publications — `array`
   *
   *
   */
  books?: Array<SanityKeyedReference<Book>>

  /**
   * Events — `array`
   *
   *
   */
  events?: Array<
    SanityKeyed<{
      _type: 'event'
      /**
       * Title — `string`
       *
       *
       */
      title?: string

      /**
       * Place — `string`
       *
       *
       */
      place?: string

      /**
       * Subtitle / Address — `text`
       *
       *
       */
      subtitle?: string

      /**
       * Date/Time — `datetime`
       *
       *
       */
      datetime?: string

      /**
       * Link — `object`
       *
       *
       */
      titledLink?: {
        _type: 'titledLink'
        /**
         * Title — `string`
         *
         *
         */
        title?: string

        /**
         * URL — `url`
         *
         *
         */
        url?: string
      }
    }>
  >

  /**
   * News — `array`
   *
   *
   */
  news?: Array<SanityKeyed<Post>>
}

/**
 * News
 *
 *
 */
export interface Post extends SanityDocument {
  _type: 'post'

  /**
   * Title — `string`
   *
   *
   */
  title?: string

  /**
   * Date — `date`
   *
   *
   */
  date?: string

  /**
   * Text — `text`
   *
   *
   */
  text?: string

  /**
   * Image — `image`
   *
   *
   */
  cover?: {
    _type: 'image'
    asset: SanityReference<SanityImageAsset>
    crop?: SanityImageCrop
    hotspot?: SanityImageHotspot
  }

  /**
   * Link — `url`
   *
   *
   */
  link?: string
}

/**
 * Settings
 *
 *
 */
export interface Settings extends SanityDocument {
  _type: 'settings'

  /**
   * Title — `string`
   *
   *
   */
  title?: string

  /**
   * Navigation Links — `array`
   *
   *
   */
  nav_links?: Array<
    | SanityKeyedReference<Homepage>
    | SanityKeyed<{
        _type: 'router-link'
        /**
         * Title — `string`
         *
         *
         */
        title?: string

        /**
         * Route — `string`
         *
         *
         */
        route?: string
      }>
  >

  /**
   * Footer Links — `array`
   *
   *
   */
  footer_links?: Array<
    SanityKeyed<{
      _type: 'router-link'
      /**
       * Title — `string`
       *
       *
       */
      title?: string

      /**
       * Reference — `reference`
       *
       *
       */
      page?: SanityReference<Homepage>
    }>
  >

  /**
   * Copyright Text — `string`
   *
   *
   */
  copyright?: string

  /**
   * Site Credit — `object`
   *
   *
   */
  credit?: {
    _type: 'credit'
    /**
     * Text — `string`
     *
     *
     */
    text?: string

    /**
     * URL — `url`
     *
     *
     */
    url?: string
  }

  /**
   * Title — `string`
   *
   *
   */
  socials_title?: string

  /**
   * Social Links — `array`
   *
   *
   */
  socials?: Array<
    SanityKeyed<{
      _type: 'social'
      /**
       * Title — `string`
       *
       *
       */
      title?: string

      /**
       * URL — `url`
       *
       *
       */
      url?: string
    }>
  >
}

export type Documents = Book | Homepage | Post | Settings
