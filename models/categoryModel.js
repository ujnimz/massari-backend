const mongoose = require('mongoose');

// get Schema from mongoose
const Schema = mongoose.Schema;

// define Schema
const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter Category Name'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
  },
  products: {
    type: [String],
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
        required: [true, 'Please enter Category Name'],
        trim: true,
      },
      description: {
        type: String,
        required: [true, 'Please enter Category Description'],
      },
    },
  ],
});

// create a modal using Schema
const Category = mongoose.model('Category', categorySchema);

// export the modal
module.exports = Category;
