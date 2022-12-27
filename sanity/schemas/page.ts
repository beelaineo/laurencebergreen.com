import { GrDocument } from 'react-icons/gr'

const page = {
  name: 'page',
  type: 'document',
  title: 'Page',
  icon: GrDocument,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule: { required: () => any; }) => Rule.required()
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
      validation: (Rule: { required: () => any; }) => Rule.required()
    },
    {
      name: 'body',
      type: 'array',
      title: 'Body',
      of: [{type: 'block'}],
    }
  ]
}

export default page