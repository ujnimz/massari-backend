const express = require('express');
const {
  getAllCategories,
  getAdminCategories,
  getCategoryDetails,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const {isAuthenticatedUser, authorizeRoles} = require('../middleware/auth');

const router = express.Router();

// Category Routes
router.route('/products/categories').get(getAllCategories);

router.route('/products/category/:id').get(getCategoryDetails);

router
  .route('/admin/products/categories')
  .get(isAuthenticatedUser, authorizeRoles('admin'), getAdminCategories);

router
  .route('/admin/product/categories/new')
  .post(isAuthenticatedUser, authorizeRoles('admin'), createCategory);

router
  .route('/admin/products/category/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateCategory)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteCategory);

module.exports = router;
