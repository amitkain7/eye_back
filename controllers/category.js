const Category = require('../models/category')
const Product = require('../models/product')
const customError = require('../errors/customerror')

const createCategory = async (req, res, next) => {
    try {
        const categories = await Category.create(req.body)
        res.stauts(201).json({cat : categories})
    }
    catch (error) {
        next(error)
    }
}

const getAllCategory = async(req ,res , next) => {
    try{
       const allCat = await Category.find({})
       res.status(200).json({categories : allCat})
    }
    catch(error){
        next(error)
    }

}

const getCategoryItem = async (req , res , next) => {
    try{
        const { Category} = req.params
        const data = await Product.find({category : Category})
        if(!data){
            throw new customError(`no item availbles with following category ${Category}` , 404)
        }
        
        res.status(200).json({items : data})
    }
    catch(error){
        next(error)
    }
}

module.exports = {
    createCategory,
    getAllCategory,
    getCategoryItem
}