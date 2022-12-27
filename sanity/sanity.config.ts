import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import schemas from './schemas'
import deskStructure from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'Laurence Bergreen',

  projectId: 'oebpyzcq',
  dataset: 'production',

  plugins: [deskTool({structure: deskStructure}), visionTool()],

  schema: {
    types: schemas,
  },

  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((templateItem) => !['settings','about','homepage','contact'].includes(templateItem.templateId))
      }
      return prev
    },
    actions: (prev, { schemaType }) => {
      if (['settings','about','homepage','contact'].includes(schemaType)) {
        return prev.filter(({ action }) => action && !['create', 'unpublish', 'delete','duplicate'].includes(action))
      }
      return prev
    },
  },
})
