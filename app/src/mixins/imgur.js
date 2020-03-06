export default {
  filters: {
    imgur(id, size) {
      switch(size) {
        case 'small': return `https://i.imgur.com/${id}b.jpg`
        case 'large': return `https://i.imgur.com/${id}h.jpg`
        default: return `https://i.imgur.com/${id}.jpg`
      }
    }
  }
}
