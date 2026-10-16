const express=require('express');
const router=express.Router();

const {listCategories}=require('../controllers/categoryController');
const {newCategoryForm}=require('../controllers/categoryController');
const {createCategory}=require('../controllers/categoryController');
const {editCategoryForm}=require('../controllers/categoryController');
const {updateCategory}=require('../controllers/categoryController');
const {deleteCategory}=require('../controllers/categoryController');

const {listItems}=require('../controllers/itemController');
const {newItemForm}=require('../controllers/itemController');
const {createItem}=require('../controllers/itemController');
const {deleteItem}=require('../controllers/itemController');
const {editItemForm}=require('../controllers/itemController');
const {updateItem}=require('../controllers/itemController');

router.get('/',listCategories)
router.get('/categories/new',newCategoryForm)
router.post('/categories',createCategory);
router.get('/categories/:id/edit',editCategoryForm);
router.post('/categories/:id',updateCategory);
router.post('/categories/:id/delete',deleteCategory);

router.get('/categories/:categoryId/items',listItems);
router.get('/categories/:categoryId/items/new',newItemForm)
router.post('/categories/:categoryId/items',createItem)
router.get('/categories/:categoryId/items/:id/edit', editItemForm);
router.post('/categories/:categoryId/items/:id', updateItem);
router.post('/categories/:categoryId/items/:id/delete', deleteItem);
module.exports=router;