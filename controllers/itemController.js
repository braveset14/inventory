const pool=require('../db/pool');

const listItems=async (req,res,next)=>{
    try{ 
        const {categoryId }=req.params;
        const {rows:items}= await pool.query('SELECT * FROM items WHERE category_id = $1 ORDER BY name',[categoryId])
        const {rows}=await pool.query('SELECT * FROM categories WHERE id= $1',[categoryId]);
        res.render('items/list',{items: items,category: rows[0]});
    }catch(error){
        next(error);
    }
};

const newItemForm=async (req,res,next)=>{
    try{
        const {categoryId}=req.params;
        const {rows}=await pool.query('SELECT * FROM categories WHERE id= $1',[categoryId]);
        res.render('items/form', {item: null, category: rows[0] });
    }catch(err){
         next(err);
    }
};

const createItem=async (req,res,next)=>{
    try{
        const {categoryId}=req.params;
        const {name, category_id,price,amount}=req.body;
        const type = req.body.type || null;
        const expiry_date = req.body.expiry_date || null;
        await pool.query('INSERT INTO items (name,category_id,type,price,amount,expiry_date) VALUES ($1,$2,$3,$4,$5,$6)', [name,categoryId,type,price,amount,expiry_date]);
        res.redirect(`/categories/${categoryId}/items`);
    }catch(err){
         next(err);
    }
}

const editItemForm=async (req,res,next)=>{
    try{
        const {categoryId,id}=req.params;
        const { rows: itemRows }=await pool.query('SELECT * FROM items where id = $1 ', [id])
        const { rows: categoryRows }=await pool.query('SELECT * FROM categories where id = $1 ', [categoryId])
        res.render('items/form', { item:itemRows[0],category: categoryRows[0] });
    }catch(err){
         next(err);
    }
}

const updateItem=async (req,res,next)=>{
    try{
        const {name,price,amount}=req.body;
        const type = req.body.type || null;
        const expiry_date = req.body.expiry_date || null;
        const {categoryId,id}=req.params;
        await pool.query('UPDATE items SET name = $1, type = $2, price = $3, amount = $4, expiry_date = $5 WHERE id = $6', [name,type, price, amount, expiry_date, id])
        res.redirect(`/categories/${categoryId}/items`);
    }catch(err){
         next(err);
    }
}

const deleteItem=async (req,res,next)=>{
    try{
        const {categoryId,id}=req.params;
        await pool.query('DELETE FROM items WHERE id = $1',[id]);
        res.redirect(`/categories/${categoryId}/items`);
    }catch(err){
         next(err);
    }
}
module.exports={listItems,newItemForm,createItem,deleteItem,editItemForm,updateItem};
