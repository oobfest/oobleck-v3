let schema = {
  name: 'act',
  columns: [
    'name', 
    'slug', 
    'creationDate', 
    'showTitle', 
    'country', 
    'stateOrProvince', 
    'city', 
    'associatedTheater', 

    'publicDescription', 
    'privateDescription', 
    'accolades',

    'imageUrl',
    'imageDeleteUrl',

    'videoUrl1',
    'videoUrl2',
    'videoInformation',

    'techNeeds',
    'maximumTime',
    'minimumTime',

    'contactName',
    'contactPhone',
    'contactEmail',
    'contactRoleId',

    'isHeadliner', 
    'isLocal',
    'isPaid',
    'isAccepted',
    'isConfirmed'
  ],
  publicColumns: ['name']
}

module.exports = schema
