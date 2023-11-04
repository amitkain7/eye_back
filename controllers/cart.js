const Cart = require('../models/cart');
const customError = require('../errors/customerror');

const saveToCart = async (req, res, next) => {

  try {
    req.body.userId = req.user.userId
    const savedCart = await Cart.create(req.body);
    res.status(201).json(savedCart);
  } catch (error) {
    next(error)
  }
};

const deleteFromCart = async (req, res, next) => {
  try {
    const { id } = req.body;
    const result = await Cart.findByIdAndDelete({ _id: id });

    if (!result) {
      throw new customError(`No item in cart with id ${id}`, 404);
    }

    res.status(200).json({ success: 'OK' });
  } catch (error) {
    next(error)
  }
};

const updateCart = async (req, res, next) => {
  try {
    const { id } = req.body;
    const updateCart = await Cart.findByIdAndUpdate({ _id: id }, req.body, { new: true, runValidators: true });
    res.status(200).json({ cartItem: updateCart });
  } catch (error) {
    next(error)
  }
};

const getCartItem = async (req, res, next) => {
  try {
    const { id } = req.body;
    const item = await Cart.findById({ _id: id });

    if (!item) {
      throw new customError(`No item in cart with id ${id}`, 404);
    }

    res.status(200).json(item);
  } catch (error) {
    next(error)
  }
};

const getCartItems = async (req, res, next) => {
  try {
    const items = await Cart.find();
    res.status(200).json(items);
  } catch (error) {
    next(error)
  }
};

module.exports = {
  saveToCart,
  deleteFromCart,
  updateCart,
  getCartItem,
  getCartItems
};
