let model = {
  checkPromoCode(promoCode) {
    return { ok: promoCode == process.env.PROMO_CODE }
  }
}

module.exports = model
