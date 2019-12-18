export default {

  install(Vue, baseUrl) {
    Vue.prototype.$http = function(target, method="GET", body=null) {
      return fetch(baseUrl + target, {
          method,
          credentials: 'include',
          headers: {'Content-Type': 'application/json'},
          body: body ? JSON.stringify(body) : null
        })
        .then(response=> {
          if (response.ok) return response.json()
          else throw new Error(response.statusText)
        })
    }
  }
}

