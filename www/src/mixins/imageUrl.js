export default {
  methods: {
    getImageUrl(imageId, size=null) {
      if(size == 'small-square')        return `https://i.imgur.com/${imageId}s.jpg`
      if(size == 'big-square')          return `https://i.imgur.com/${imageId}b.jpg`
      if(size == 'small-thumbnail')     return `https://i.imgur.com/${imageId}t.jpg`
      if(size == 'medium-thumbnail')    return `https://i.imgur.com/${imageId}m.jpg`
      if(size == 'large-thumbnail')     return `https://i.imgur.com/${imageId}l.jpg`
      if(size == 'huge-thumbnail')      return `https://i.imgur.com/${imageId}h.jpg`
      else return `http://i.imgur.com/${imageId}.jpg`
    },
    getDeleteImageUrl(deleteImageHash) {
      return `https://imgur.com/delete/${deleteImageHash}`
    }
  }
}
