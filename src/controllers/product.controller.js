const Product = require('../models/product.model')

exports.getAllProduct = async (req, res, next) => {
  try {
    // Pagination
    const page = parseInt(req.query.currentPage) || 0
    const limit = parseInt(req.query.limit) || 10
    const skip = page * limit
    let totalItems = await Product.countDocuments()

    // Search name and category
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {}
    const category = req.query.category
    // Sort and order
    const orderBy = req.query.order === 'asc' ? 1 : -1
    const sortBy = req.query.sortBy || 'createdAt'

    if (Object.keys(keyword).length !== 0 && !category) {
      const products = await Product.find({
        ...keyword,
      })
        .skip(skip)
        .limit(limit)
        .sort([[sortBy, orderBy]])
        .populate('category')
        .populate('size')

      res.status(200).json({
        products,
        limit: Number(limit),
        currentPage: Number(page),
        totalItems,
      })
    } else if (
      (Object.keys(keyword).length !== 0 && category) ||
      (Object.keys(keyword).length === 0 && category)
    ) {
      const products = await Product.find({
        ...keyword,
        category: category,
      })
        .skip(skip)
        .limit(limit)
        .sort([[sortBy, orderBy]])
        .populate('category')
        .populate('size')

      res.status(200).json({
        products,
        limit: Number(limit),
        currentPage: Number(page),
        totalItems,
      })
    } else {
      const products = await Product.find({
        ...keyword,
      })
        .skip(skip)
        .limit(limit)
        .sort([[sortBy, orderBy]])
        .populate('category')
        .populate('size')
      res.status(200).json({
        products,
        limit: Number(limit),
        currentPage: Number(page),
        totalItems,
      })
    }
  } catch (error) {
    next(error)
  }
}

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category')
      .populate('size')

    res.status(200).json({ product })
  } catch (error) {
    next(error)
  }
}

exports.addProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body)

    res.status(200).json({ product })
  } catch (error) {
    next(error)
  }
}

exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
        runValidators: true,
      },
    )

    res.status(200).json({ product })
  } catch (error) {
    next(error)
  }
}

exports.deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id)

    res.status(200).json('Product has been deleted')
  } catch (error) {
    next(error)
  }
}
