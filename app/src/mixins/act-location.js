export default {
  filters: {
    location(act) {
      let string = ''
      if (act.associatedTheater) string += act.associatedTheater + ', '
      string += act.city + ', '
      if (act.stateOrProvince) string += act.stateOrProvince
      if (act.country != 'US') string += ', ' + act.country
      return string
    }
  }
}

