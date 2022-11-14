const Size = require('../models/size.model')

exports.getAllSize = async (req, res, next) => {
  try {
    const page = req.query.currentPage || 0
    const limit = req.query.limit || 10

    const regex = new RegExp(req.query.keyword, 'i')
    const query = { name: regex }

    await Size.find(query)
      .skip(limit * page)
      .limit(limit)
      .exec((err, sizes) => {
        Size.countDocuments((err, count) => {
          if (err) return next(err)
          res.status(200).json({
            sizes,
            limit: Number(limit),
            currentPage: Number(page),
            totalItems: count,
          })
        })
      })
  } catch (error) {
    next(error)
  }
}

exports.getSize = async (req, res, next) => {
  try {
    const size = await Size.findById(req.params.id)

    res.status(200).json({ size })
  } catch (error) {
    next(error)
  }
}

exports.addSize = async (req, res, next) => {
  try {
    const size = await Size.create(req.body)

    res.status(200).json({ size })
  } catch (error) {
    next(error)
  }
}

exports.updateSize = async (req, res, next) => {
  try {
    const size = await Size.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
        runValidators: true,
      },
    )

    res.status(200).json({ size })
  } catch (error) {
    next(error)
  }
}

exports.deleteSize = async (req, res, next) => {
  try {
    await Size.findByIdAndDelete(req.params.id)
    res.status(200).json('Size has been deleted')
  } catch (error) {
    next(error)
  }
}
