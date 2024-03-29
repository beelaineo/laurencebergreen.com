import { BsBook } from 'react-icons/bs'

const titledLink = {
  name: 'titledLink',
  type: 'object',
  title: 'Link',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule: { required: () => any; }) => Rule.required()
    },
    {
      name: 'url',
      type: 'url',
      title: 'URL'
    },
    {
      name: 'pdf',
      type: 'file',
      title: 'PDF',
      options: {
        accept: '.pdf,.mp3'
      }
    }
  ]
}

export default {
  name: 'book',
  type: 'document',
	title: 'Book',
  icon: BsBook,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } },
    {
      name: 'cover',
      type: 'image',
      title: 'Cover Image'
    },
    {
      name: 'color',
      type: 'color',
      title: 'Theme Color',
      validation: (Rule: { required: () => any; }) => Rule.required()
    },
    {
      name: 'date',
      type: 'date',
      title: 'Date Published'
    },
    {
      name: 'category',
      type: 'string',
      title: 'Book Type',
      initialValue: 'book',
      options: {
        list: [
          {title: 'Book', value: 'book'},
          {title: 'Young Adult Book', value: 'ya_book'}
        ],
        layout: 'radio'
      }
    },
    {
      name: 'buy_link',
      type: 'url',
      title: 'Buy Link (default)',
    },
    {
      name: 'intro',
      type: 'array', 
      of: [{type: 'block'}],
      title: 'Intro Text'
    },
    {
      name: 'intro_gallery',
      type: 'array',
      title: 'Intro Images',
      of: [{type: 'image'}]
    },
    {
      name: 'publishers',
      type: 'array',
      title: 'Publishers',
      of: [titledLink]
    },
    {
      name: 'accolades',
      type: 'array',
      title: 'Accolades',
      of: [titledLink]
    },
    {
      name: 'visit',
      type: 'object',
      title: 'Visit Button',
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Title',
          validation: (Rule: { required: () => any; }) => Rule.required()
        },
        {
          name: 'url',
          type: 'url',
          title: 'URL'
        }
      ]
    },
    {
      name: 'sellers',
      type: 'array',
      title: 'Book Sellers',
      of: [
        {
          name: 'seller',
          type: 'object',
          title: 'Seller',
          fields: [
            {
              name: 'category',
              type: 'string',
              title: 'Category',
              options: {
                list: [
                  {title: 'Hardcover', value: 'hardcover'},
                  {title: 'Paperback', value: 'paperback'},
                  {title: 'Ebook', value: 'ebook'}
                ]
              },
              validation: (Rule: { required: () => any; }) => Rule.required()
            },
            {
              name: 'title',
              type: 'string',
              title: 'Title',
              validation: (Rule: { required: () => any; }) => Rule.required()
            },
            {
              name: 'url',
              type: 'url',
              title: 'URL',
              validation: (Rule: { required: () => any; }) => Rule.required()
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'category'
            }
          },
        }
      ],     
    },
    {
      name: 'reviews',
      type: 'array',
      title: 'Reviews',
      of: [
        {
          name: 'review',
          type: 'object',
          title: 'Review',
          fields: [
            {
              name: 'source',
              type: 'string',
              title: 'Source',
              validation: (Rule: { required: () => any; }) => Rule.required()
            },
            {
              name: 'quote',
              type: 'array',
              of: [{type: 'block'}],
              title: 'Quote',
              validation: (Rule: { required: () => any; }) => Rule.required()
            },
            {
              name: 'url',
              type: 'url',
              title: 'URL'
            },
            {
              name: 'pdf',
              type: 'file',
              title: 'PDF',
              options: {
                accept: '.pdf'
              }
            }
          ]
        }
      ]
    },
    {
      name: 'excerpt',
      type: 'object',
      title: 'Excerpt',
      fields: [
        {
          name: 'text',
          type: 'array', 
          of: [
            {
              type: 'block',
              of: [ 
                {
                  name: 'moreDivider', 
                  type: 'object', 
                  title: 'Read More Divider',
                  icon: () => '✂️',
                  fields: [
                    {
                      name: 'label',
                      type: 'string',
                      title: 'Label',
                      initialValue: 'More',
                      validation: (Rule: { required: () => any; }) => Rule.required()
                    }
                  ]
                } 
              ],
            } 
          ],
        }
      ]
    },
    {
      name: 'gallery',
      type: 'object',
      title: 'Gallery',
      fields: [
        {
          name: 'title',
          type: 'string',
          title: 'Title'
        },
        {
          name: 'images',
          type: 'array',
          title: 'Images',
          of: [
            {
              name: 'gallery_image',
              type: 'object',
              title: 'Image',
              fields: [
                {
                  name: 'image',
                  type: 'image',
                  title: 'Image'
                },
                {
                  name: 'caption',
                  type: 'string',
                  title: 'Caption'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'links',
      type: 'array',
      title: 'Links',
      of: [titledLink]
    },
  ]
}
