let schema = {
  name: 'person',
  columns: ['name', 'bio', 'email', 'phone', 'imageUrl', 'imageDeleteUrl'],
  publicColumns: ['name', 'bio', 'imageUrl']
}

module.exports = schema
