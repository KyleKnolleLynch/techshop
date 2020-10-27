import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

//  @desc     Fetch all products
//  @route    GET /api/products
//  @access   Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})

  res.json(products)
})

//  @desc     Fetch single product
//  @route    GET /api/products/:id
//  @access   Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//  @desc     Delete a product
//  @route    DELETE /api/products/:id
//  @access   Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//  @desc     Create a product
//  @route    POST /api/products
//  @access   Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user: req.user._id,
    title: 'Sample title',
    category: 'Sample category',
    manufacturer: 'Sample manufacturer',
    image: '/images/sample.jpg',
    price: 0,
    info: 'Sample info',
    coolingSolution: 'Sample solution',
    countInStock: 0,
    reviewCount: 0,
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

//  @desc     Update a product
//  @route    PUT /api/products/:id
//  @access   Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    title,
    category,
    manufacturer,
    image,
    price,
    info,
    coolingSolution,
    countInStock,
    reviewCount,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.title = title
    product.category = category
    product.manufacturer = manufacturer
    product.image = image
    product.price = price
    product.info = info
    product.coolingSolution = coolingSolution
    product.countInStock = countInStock
    product.reviewCount = reviewCount

    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
}
