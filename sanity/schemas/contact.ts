import { GrContact } from 'react-icons/gr'

const entry = {
  name: 'entry',
  type: 'object',
  title: 'Contact Entry',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule: { required: () => any; }) => Rule.required()
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email',
      validation: (Rule: { required: () => any; }) => Rule.required()
    }
  ]
}

const section = {
  name: 'section',
  type: 'object',
  title: 'Inquiry Section',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule: { required: () => any; }) => Rule.required()
    },
    {
      name: 'entries',
      type: 'array',
      title: 'Contact Entries',
      of: [entry]
    }
  ]
}

const contact = {
  name: 'contact',
  type: 'document',
  title: 'Contact',
  icon: GrContact,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule: { required: () => any; }) => Rule.required()
    },
    {
      name: 'sections',
      type: 'array',
      title: 'Inquiry Sections',
      of: [section],
    }
  ]
}

export default contact