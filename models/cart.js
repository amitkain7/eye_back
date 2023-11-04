const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { 
        type: mongoose.Types.ObjectId, 
        ref : 'user',
        required: [true , 'please provide userId']
    },
    products: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref : 'product',
          required : [true , 'please provide productId']
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);