let schema = {
  name: 'show',
  columns: ['timestamp', 'duration', 'name', 'imageUrl', 'imageDeleteUrl', 'dayId', 'stageId'],
  publicColumns: ['name', 'timestamp', 'duration', 'imageUrl']
}

module.exports = schema
