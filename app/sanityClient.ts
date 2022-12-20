import { createClient } from 'next-sanity'

const sanityClient = createClient({
  projectId: 'oebpyzcq',
  dataset: 'production',
  apiVersion: '2022-12-16',
  useCdn: false,
})

export default sanityClient