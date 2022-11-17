const Order = require('../models/order.model')

exports.getAllOrder = async (req, res, next) => {
  try {
    if (req.query.userId) {
      const orders = await Order.find({ userId: req.query.userId })
      res.status(200).json({ orders })
    } else {
      const page = req.query.currentPage || 0
      const limit = req.query.limit || 10

      const regex = new RegExp(req.query.keyword, 'i')
      const query = { status: regex }

      await Order.find(query)
        .skip(limit * page)
        .limit(limit)
        .exec((err, orders) => {
          Order.countDocuments((err, count) => {
            if (err) return next(err)
            res.status(200).json({
              orders,
              limit: Number(limit),
              currentPage: Number(page),
              totalItems: count,
            })
          })
        })
    }
  } catch (error) {
    next(error)
  }
}

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)


    res.status(200).json({ order })
  } catch (error) {
    next(error)
  }
}

exports.addlOrder = async (req, res, next) => {
  try {
    const order = await Order.create(req.body.data)

    res.status(200).json({ order })
  } catch (error) {
    next(error)
  }
}

exports.updateOrder = async (req, res, next) => {
  try {
    const newOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body.data,
      },
      {
        new: true,
        runValidator: true,
      },
    )

    res.status(200).json({ newOrder })
  } catch (error) {
    next(error)
  }
}

exports.deleteOrder = async (req, res, next) => {
  try {
    await Order.findOneAndDelete(req.params.id)

    res.status(200).json('Order has been deleted')
  } catch (error) {
    next(error)
  }
}
