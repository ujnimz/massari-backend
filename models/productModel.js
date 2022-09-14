const mongoose = require('mongoose');

// get Schema from mongoose
const Schema = mongoose.Schema;

// define Schema
const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter Product Name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please enter Product Description'],
  },
  price: {
    type: Number,
    required: [true, 'Please enter Product Price'],
    maxLength: [8, 'Product Price cannot exceed 8 characters'],
  },
  salePrice: {
    type: Number,
    maxLength: [8, 'Product Sale Price cannot exceed 8 characters'],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  categories: [
    {
      category_id: {
        type: String,
        required: true,
      },
      category_name: {
        type: String,
        required: true,
      },
    },
  ],
  stock: {
    type: Number,
    required: [true, 'Please enter Product Stock'],
    maxLength: [4, 'Product Stock cannot exceed 4 characters'],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  status: {
    type: String,
    default: 'Published',
    trim: true,
  },
  sku: {
    type: String,
    required: true,
    trim: true,
  },
  soldIndividually: {
    type: Boolean,
    default: false,
  },
  weight: {
    type: Number,
  },
  length: {
    type: Number,
  },
  width: {
    type: Number,
  },
  height: {
    type: Number,
  },
  seoTitle: {
    type: String,
    trim: true,
  },
  seoDescription: {
    type: String,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  language: {
    type: String,
    required: [true, 'Please enter default language'],
    trim: true,
    default: 'en',
  },
  translation: [
    {
      language: {
        type: String,
        required: [true, 'Please enter the language'],
        trim: true,
      },
      name: {
        type: String,
        required: [true, 'Please enter Product Name'],
        trim: true,
      },
      description: {
        type: String,
        required: [true, 'Please enter Product Description'],
      },
    },
  ],
});

// create a modal using Schema
const Product = mongoose.model('Product', productSchema);

// export the modal
module.exports = Product;
