import { FiSettings } from 'react-icons/fi'

export default {
  name: 'settings',
  type: 'document',
  title: 'Settings',
  icon: FiSettings,
  fieldsets: [
    {name: 'menu', title: 'Primary Menu'},
    {name: 'footer', title: 'Footer Menu'},
    {name: 'social', title: 'Social Footer'}
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'nav_links',
      type: 'array',
      title: 'Navigation Links',
      of: [
        { 
          type: 'reference',
          to: [{type: 'homepage'}]
        },
        {
          name: 'router-link',
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Title'
            },
            {
              name: 'route',
              type: 'string',
              title: 'Route'
            },
          ]
        }
      ],
      fieldset: 'menu'
    },
    {
      name: 'footer_links',
      type: 'array',
      title: 'Footer Links',
      of: [
        {
          name: 'router-link',
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Title'
            },
            {
              name: 'page',
              type: 'reference',
              title: 'Reference',
              to: [{type: 'homepage'}]
            },
          ]
        }
      ],
      fieldset: 'footer'
    },
    {
      name: 'copyright',
      type: 'string',
      title: 'Copyright Text',
      fieldset: 'footer'
    },
    {
      name: 'credit',
      type: 'object',
      title: 'Site Credit',
      fields: [
        {
          name: 'text',
          type: 'string',
          title: 'Text'
        },
        {
          name: 'url',
          type: 'url',
          title: 'URL',
        },
      ],
      fieldset: 'footer'
    },
    {
      name: 'socials_title',
      type: 'string',
      title: 'Title',
      fieldset: 'social'
    },
    {
      name: 'socials',
      type: 'array',
      title: 'Social Links',
      of: [
        {
          name: 'social',
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Title'
            },
            {
              name: 'url',
              type: 'url',
              title: 'URL',
            },
          ]
        }
      ],
      fieldset: 'social'
    },
  ]
}