import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import schemas from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Laurence Bergreen',

  projectId: 'oebpyzcq',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemas,
  },
})
