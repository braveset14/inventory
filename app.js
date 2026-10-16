require('dotenv').config()
const express = require("express");
const path = require('path');
const indexRouter=require('./routers/indexRouter');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

// routers

app.use('/', indexRouter),
// app.use('/categories', categoriesRouter),
// app.use('/items', itemsRouter)

app.listen(process.env.PORT || 3000, (error) => {
    if (error) { console.log(error) }
    console.log(`My first Express app - listening on port !`);
})