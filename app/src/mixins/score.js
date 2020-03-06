export default {
  filters: {
    score(value) {
      switch(value) {
        case 5: return '🤩'
        case 4: return '🙂'
        case 3: return '😐'
        case 2: return '😟'
        case 1: return '😡'
      }
    }
  }
}
