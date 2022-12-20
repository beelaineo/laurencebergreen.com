import { AiOutlineHome } from 'react-icons/ai'

const event = {
  name: 'event',
  type: 'object',
  title: 'Event',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule: { required: () => any; }) => Rule.required()
    },
    {
      name: 'place',
      type: 'string',
      title: 'Place',
      validation: (Rule: { required: () => any; }) => Rule.required()
    },
    {
      name: 'subtitle',
      type: 'text',
      title: 'Subtitle / Address',
    },
    {
      name: 'datetime',
      type: 'datetime',
      title: 'Date/Time'
    },
    {
      name: 'timezone',
      type: 'string',
      title: 'Timezone',
    },
    {
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
        }
      ]
    }
  ]
}

const homepage = {
  name: 'homepage',
  type: 'document',
  title: 'Homepage',
  icon: AiOutlineHome,
  fieldsets: [
    {name: 'hero', title: 'Hero'},
    {name: 'publications', title: 'Recent Publications'},
    {name: 'engagements', title: 'Speaking Engagements'},
    {name: 'news', title: 'News'}
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'hero_text',
      type: 'text',
      title: 'Hero Text',
      fieldset: 'hero'
    },
    {
      name: 'hero_image',
      type: 'image',
      title: 'Hero Image',
      fieldset: 'hero'
    },
    {
      name: 'sticker_text',
      type: 'string',
      title: 'Sticker Text',
      fieldset: 'hero'
    },
    {
      name: 'books',
      type: 'array',
      title: 'Recent Publications',
      of: [{type: 'reference', to: {type: 'book'}}],
      fieldset: 'publications'
    },
    {
      name: 'events',
      type: 'array',
      title: 'Events',
      of: [event],
      fieldset: 'engagements'
    },
    {
      name: 'news',
      type: 'array',
      title: 'News',
      of: [{type: 'post'}]
    }
  ]
}

export default homepage