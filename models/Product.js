const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
{
  name: String,
  rating: Number,
  comment: String,
},
{
  timestamps: true,
}
);

const productSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  countInStock: {
    type: Number,
    required: true,
  },

  reviews: [reviewSchema],

  numReviews: {
    type: Number,
    default: 0,
  },

  rating: {
    type: Number,
    default: 0,
  },
},
{
  timestamps: true,
}
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;