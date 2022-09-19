const Category = require('../models/categoryModel');
const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apifeatures');

// Get all Categories
exports.getAllCategories = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;
  const categoriesCount = await Category.countDocuments();
  console.log(req.query);
  const apiFeature = new ApiFeatures(Category.find(), req.query)
    .search()
    .filter();

  let categories = await apiFeature.query;

  let filteredCategoriesCount = categories.length;

  apiFeature.pagination(resultPerPage);

  categories = await apiFeature.query;

  res.status(200).json({
    success: true,
    categories,
    categoriesCount,
    resultPerPage,
    filteredCategoriesCount,
  });
});

// Get all Categories -- Admin
exports.getAdminCategories = catchAsyncErrors(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).json({
    success: true,
    categories,
  });
});

// Get Category Details
exports.getCategoryDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Category.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander('Category not found', 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Create a new Category -- Admin
exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  // checking if user is already registered
  const {name} = req.body;
  let category = await Category.findOne({name});
  if (category) return next(new ErrorHander('Category already added.', 400));

  category = await Category.create(req.body);

  res.status(201).json({
    success: true,
    category,
  });
});

// Update a Category -- Admin
exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
  let category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHander('Category not found', 404));
  }

  category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    category,
  });
});

// Delete a Category -- Admin
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new ErrorHander('Category not found', 404));
  }

  await category.remove();

  res.status(200).json({
    success: true,
    message: 'Category deleted successfully.',
  });
});
