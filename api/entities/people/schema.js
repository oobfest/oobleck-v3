let schema = {
  name: 'person',
  columns: ['name', 'bio', 'email', 'phone', 'imageUrl', 'imageDeleteUrl', 'isHidden', 'isConfirmed'],
  publicColumns: ['name', 'bio', 'imageUrl']
}

module.exports = schema
