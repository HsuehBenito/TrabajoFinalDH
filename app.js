const express = require('express');
const path = require('path');
const app = express();
const methodOverride = require('method-override');

const mainRouter = require('./src/routes/mainRouter')
const usersRouter = require('./src/routes/usersRouter')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './public')));  


app.set('views', path.join(__dirname, './src/views'));

app.use('/', mainRouter);
app.use('/users', usersRouter);
app.use(methodOverride("_method"));


//
app.listen(process.env.PORT || 3003, () => {
    console.log("Servidor ON MAKINOLA");
});