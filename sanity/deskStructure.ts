export default (S) => S.list().title('Content').items([
  ...S.documentTypeListItems().filter(listItem => !['post'].includes(listItem.getId()))
])