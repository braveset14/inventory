require('dotenv').config();
const express = require('express');
const path = require('path');
const indexRouter = require('./routers/indexRouter');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

// Vercel imports this app as a serverless function. Start a local server only
// when this file is run directly with `npm start`.
if (require.main === module) {
  app.listen(process.env.PORT || 3000, (error) => {
    if (error) console.log(error);
    console.log(`Inventory app listening on port ${process.env.PORT || 3000}`);
  });
}

module.exports = app;
