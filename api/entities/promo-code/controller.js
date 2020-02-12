let model = require('./model')

let controller = {
  checkPromoCode(request, response) {
    let promoCode = request.body.promoCode
    response.json(model.checkPromoCode(promoCode))
  }
}

module.exports = controller
