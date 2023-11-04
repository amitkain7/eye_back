const Product = require('../models/product')

const customError = require('../errors/customerror')
const { Error } = require('mongoose')

const createProduct = async (req, res, next) => {
    try {

        const data = await Product.create(req.body)

        res.status(201).json({ msg: 'successfull', product: data })


    }
    catch (error) {
        next(error)
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const result = await Product.findByIdAndDelete({ _id: id })
        if (!result) {
            throw new customError(`no item availble with following id ${id}`, 404)
        }
        res.status(200).json({ msg: 'successful' })
    } catch (error) {
        next(error)
    }

}

const getAllproduct = async (req, res, next) => {
    try {
        const { limit, category, sort, gender } = req.query
        const queryObject = {}

        if (category) {
            queryObject.category = { $regex: category, $options: 'i' }
        }
        if (gender) {
            queryObject.gender = { $regex: gender, $options: 'i' }
        }


        const allproduct = await Product.find(queryObject).limit(Number(limit))

        res.status(200).json({ products: allproduct, count: allproduct.length })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const getProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const product = await Product.findById({ _id: id })
        if (!product) {
            throw new customError(`no item availble with following id ${id}`, 404)
        }
        res.status(200).json({ product: product })

    } catch (error) {
        next(error)
    }
}

module.exports = {
    createProduct,
    deleteProduct,
    getAllproduct,
    getProduct
}