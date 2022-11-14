const Stripe = require('stripe')

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

const stripe = Stripe(STRIPE_SECRET_KEY)

exports.payment = async (req, res, next) => {
  try {
    stripe.charges.create(
      {
        source: req.body.data.tokenId,
        amount: req.body.data.amount,
        description: 'no desc',
        currency: 'usd',
      },
      (error, stripe) => {
        if (error) {
          const err = new Error(error.error)
          err.statusCode = 500
          return next(err)
        } else {
          res.status(200).json({ stripe })
        }
      },
    )
  } catch (error) {
    next(error)
  }
}
