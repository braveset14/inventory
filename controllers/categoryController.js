const pool=require('../db/pool');
const listCategories=async (req,res,next)=>{
    try{ 
        const {rows}=await pool.query('SELECT * FROM categories ORDER BY name');
        res.render('index',{categories: rows});

    }catch(error){
        next(error);
    }
};

const newCategoryForm=async (req,res,next)=>{
    try{
        res.render('categories/form', { category: null })
    }catch(err){
         next(err);
    }
}

const createCategory=async (req,res,next)=>{
    try{
        const {name}=req.body;
        await pool.query('INSERT INTO categories (name) VALUES ($1)', [name])
        res.redirect('/');
    }catch(err){
         next(err);
    }
}

const editCategoryForm=async (req,res,next)=>{
    try{
        const {id}=req.params;
        const {rows}=await pool.query('SELECT * FROM categories where id = $1 ', [id])
        res.render('categories/form', { category: rows[0] });
    }catch(err){
         next(err);
    }
}

const updateCategory=async (req,res,next)=>{
    try{
        const {name}=req.body;
        const {id}=req.params;
        await pool.query('UPDATE categories SET name = $1 WHERE id = $2', [name,id])
          res.redirect('/');
    }catch(err){
         next(err);
    }
}

const deleteCategory=async (req,res,next)=>{
    try{
        const {id}=req.params;
        await pool.query('DELETE FROM categories WHERE id = $1',[id])
        res.redirect('/');
    }catch(err){
         next(err);
    }
}

module.exports={listCategories,newCategoryForm,createCategory,editCategoryForm,updateCategory,deleteCategory};