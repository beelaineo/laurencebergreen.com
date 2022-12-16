import { BsNewspaper } from 'react-icons/bs'

export default {
  name: 'post',
  type: 'document',
	title: 'News',
  icon: BsNewspaper,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    { name: 'date', type: 'date', title: 'Date' },
    {
      name: 'text',
      type: 'text', 
      title: 'Text'
    },
    {
      name: 'cover',
      type: 'image',
      title: 'Image'
    },
    {
      name: 'link',
      type: 'url',
      title: 'Link'
    },
  ]
}
