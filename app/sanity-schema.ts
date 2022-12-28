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
} from "sanity-codegen";

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
};

/**
 * Book
 *
 *
 */
export interface Book extends SanityDocument {
  _type: "book";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Cover Image — `image`
   *
   *
   */
  cover?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Theme Color — `color`
   *
   *
   */
  color?: Color;

  /**
   * Date Published — `date`
   *
   *
   */
  date?: string;

  /**
   * Book Type — `string`
   *
   *
   */
  category?: "book" | "ya_book";

  /**
   * Buy Link (default) — `url`
   *
   *
   */
  buy_link?: string;

  /**
   * Intro Text — `array`
   *
   *
   */
  intro?: Array<SanityKeyed<SanityBlock>>;

  /**
   * Intro Images — `array`
   *
   *
   */
  intro_gallery?: Array<
    SanityKeyed<{
      _type: "image";
      asset: SanityReference<SanityImageAsset>;
      crop?: SanityImageCrop;
      hotspot?: SanityImageHotspot;
    }>
  >;

  /**
   * Publishers — `array`
   *
   *
   */
  publishers?: Array<
    SanityKeyed<{
      _type: "titledLink";
      /**
       * Title — `string`
       *
       *
       */
      title?: string;

      /**
       * URL — `url`
       *
       *
       */
      url?: string;

      /**
       * PDF — `file`
       *
       *
       */
      pdf?: { _type: "file"; asset: SanityReference<any> };
    }>
  >;

  /**
   * Accolades — `array`
   *
   *
   */
  accolades?: Array<
    SanityKeyed<{
      _type: "titledLink";
      /**
       * Title — `string`
       *
       *
       */
      title?: string;

      /**
       * URL — `url`
       *
       *
       */
      url?: string;

      /**
       * PDF — `file`
       *
       *
       */
      pdf?: { _type: "file"; asset: SanityReference<any> };
    }>
  >;

  /**
   * Visit Button — `object`
   *
   *
   */
  visit?: {
    _type: "visit";
    /**
     * Title — `string`
     *
     *
     */
    title?: string;

    /**
     * URL — `url`
     *
     *
     */
    url?: string;
  };

  /**
   * Book Sellers — `array`
   *
   *
   */
  sellers?: Array<
    SanityKeyed<{
      _type: "seller";
      /**
       * Category — `string`
       *
       *
       */
      category?: "hardcover" | "paperback" | "ebook";

      /**
       * Title — `string`
       *
       *
       */
      title?: string;

      /**
       * URL — `url`
       *
       *
       */
      url?: string;
    }>
  >;

  /**
   * Reviews — `array`
   *
   *
   */
  reviews?: Array<
    SanityKeyed<{
      _type: "review";
      /**
       * Source — `string`
       *
       *
       */
      source?: string;

      /**
       * Quote — `array`
       *
       *
       */
      quote?: Array<SanityKeyed<SanityBlock>>;

      /**
       * URL — `url`
       *
       *
       */
      url?: string;

      /**
       * PDF — `file`
       *
       *
       */
      pdf?: { _type: "file"; asset: SanityReference<any> };
    }>
  >;

  /**
   * Excerpt — `object`
   *
   *
   */
  excerpt?: {
    _type: "excerpt";
    /**
     * text — `array`
     *
     *
     */
    text?: Array<SanityKeyed<SanityBlock>>;
  };

  /**
   * Gallery — `object`
   *
   *
   */
  gallery?: {
    _type: "gallery";
    /**
     * Title — `string`
     *
     *
     */
    title?: string;

    /**
     * Images — `array`
     *
     *
     */
    images?: Array<
      SanityKeyed<{
        _type: "gallery_image";
        /**
         * Image — `image`
         *
         *
         */
        image?: {
          _type: "image";
          asset: SanityReference<SanityImageAsset>;
          crop?: SanityImageCrop;
          hotspot?: SanityImageHotspot;
        };

        /**
         * Caption — `string`
         *
         *
         */
        caption?: string;
      }>
    >;
  };

  /**
   * Links — `array`
   *
   *
   */
  links?: Array<
    SanityKeyed<{
      _type: "titledLink";
      /**
       * Title — `string`
       *
       *
       */
      title?: string;

      /**
       * URL — `url`
       *
       *
       */
      url?: string;

      /**
       * PDF — `file`
       *
       *
       */
      pdf?: { _type: "file"; asset: SanityReference<any> };
    }>
  >;
}

/**
 * Homepage
 *
 *
 */
export interface Homepage extends SanityDocument {
  _type: "homepage";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Hero Text — `text`
   *
   *
   */
  hero_text?: string;

  /**
   * Hero Image — `image`
   *
   *
   */
  hero_image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Sticker Text — `string`
   *
   *
   */
  sticker_text?: string;

  /**
   * Recent Publications — `array`
   *
   *
   */
  books?: Array<SanityKeyedReference<Book>>;

  /**
   * Events — `array`
   *
   *
   */
  events?: Array<
    SanityKeyed<{
      _type: "event";
      /**
       * Title — `string`
       *
       *
       */
      title?: string;

      /**
       * Place — `string`
       *
       *
       */
      place?: string;

      /**
       * Subtitle / Address — `text`
       *
       *
       */
      subtitle?: string;

      /**
       * Date/Time — `datetime`
       *
       *
       */
      datetime?: string;

      /**
       * Timezone — `string`
       *
       *
       */
      timezone?: string;

      /**
       * Link — `object`
       *
       *
       */
      titledLink?: {
        _type: "titledLink";
        /**
         * Title — `string`
         *
         *
         */
        title?: string;

        /**
         * URL — `url`
         *
         *
         */
        url?: string;
      };
    }>
  >;

  /**
   * News — `array`
   *
   *
   */
  news?: Array<SanityKeyed<Post>>;
}

/**
 * News
 *
 *
 */
export interface Post extends SanityDocument {
  _type: "post";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Date — `date`
   *
   *
   */
  date?: string;

  /**
   * Text — `text`
   *
   *
   */
  text?: string;

  /**
   * Image — `image`
   *
   *
   */
  cover?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Link — `url`
   *
   *
   */
  link?: string;
}

/**
 * Settings
 *
 *
 */
export interface Settings extends SanityDocument {
  _type: "settings";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Navigation Links — `array`
   *
   *
   */
  nav_links?: Array<
    | SanityKeyedReference<Homepage>
    | SanityKeyed<{
        _type: "router-link";
        /**
         * Title — `string`
         *
         *
         */
        title?: string;

        /**
         * Route — `string`
         *
         *
         */
        route?: string;
      }>
  >;

  /**
   * Footer Links — `array`
   *
   *
   */
  footer_links?: Array<
    SanityKeyed<{
      _type: "router-link";
      /**
       * Title — `string`
       *
       *
       */
      title?: string;

      /**
       * Reference — `reference`
       *
       *
       */
      page?: SanityReference<Homepage>;
    }>
  >;

  /**
   * Copyright Text — `string`
   *
   *
   */
  copyright?: string;

  /**
   * Site Credit — `object`
   *
   *
   */
  credit?: {
    _type: "credit";
    /**
     * Text — `string`
     *
     *
     */
    text?: string;

    /**
     * URL — `url`
     *
     *
     */
    url?: string;
  };

  /**
   * Title — `string`
   *
   *
   */
  socials_title?: string;

  /**
   * Social Links — `array`
   *
   *
   */
  socials?: Array<
    SanityKeyed<{
      _type: "social";
      /**
       * Title — `string`
       *
       *
       */
      title?: string;

      /**
       * URL — `url`
       *
       *
       */
      url?: string;
    }>
  >;
}

/**
 * About
 *
 *
 */
export interface About extends SanityDocument {
  _type: "about";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Image — `image`
   *
   *
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Intro Text — `text`
   *
   *
   */
  intro?: string;

  /**
   * Body Text — `array`
   *
   *
   */
  body?: Array<SanityKeyed<SanityBlock>>;

  /**
   * Awards — `array`
   *
   *
   */
  awards?: Array<
    SanityKeyed<{
      _type: "award";
      /**
       * Title — `string`
       *
       *
       */
      title?: string;

      /**
       * Subtitle — `string`
       *
       *
       */
      subtitle?: string;

      /**
       * Link — `url`
       *
       *
       */
      link?: string;
    }>
  >;

  /**
   * Author Bio PDF — `file`
   *
   *
   */
  bio?: { _type: "file"; asset: SanityReference<any> };
}

/**
 * Contact
 *
 *
 */
export interface Contact extends SanityDocument {
  _type: "contact";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Inquiry Sections — `array`
   *
   *
   */
  sections?: Array<
    SanityKeyed<{
      _type: "section";
      /**
       * Title — `string`
       *
       *
       */
      title?: string;

      /**
       * Contact Entries — `array`
       *
       *
       */
      entries?: Array<
        SanityKeyed<{
          _type: "entry";
          /**
           * Title — `string`
           *
           *
           */
          title?: string;

          /**
           * Email — `string`
           *
           *
           */
          email?: string;
        }>
      >;
    }>
  >;
}

/**
 * Page
 *
 *
 */
export interface Page extends SanityDocument {
  _type: "page";

  /**
   * Title — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Body — `array`
   *
   *
   */
  body?: Array<SanityKeyed<SanityBlock>>;
}

export type Documents =
  | Book
  | Homepage
  | Post
  | Settings
  | About
  | Contact
  | Page;

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type Color = any;
