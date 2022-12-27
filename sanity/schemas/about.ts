import { AiOutlineInfoCircle } from 'react-icons/ai'

const award = {
  name: 'award',
  type: 'object',
  title: 'Award',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule: { required: () => any; }) => Rule.required()
    },
    {
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle'
    },
    {
      name: 'link',
      type: 'url',
      title: 'Link'
    }
  ]
}

const about = {
  name: 'about',
  type: 'document',
  title: 'About',
  icon: AiOutlineInfoCircle,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image'
    },
    {
      name: 'intro',
      type: 'text',
      title: 'Intro Text'
    },
    {
      name: 'body',
      type: 'array',
      title: 'Body Text',
      of: [{type: 'block'}]
    },
    {
      name: 'awards',
      type: 'array',
      title: 'Awards',
      of: [award],
    },
    {
      name: 'bio',
      type: 'file',
      title: 'Author Bio PDF'
    }
  ]
}

export default about