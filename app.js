const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const cookies = require('cookie-parser');
const methodOverride = require('method-override');
const multer = require('multer');
const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');

const mainRouter = require('./src/routes/mainRouter');
const usersRouter = require('./src/routes/usersRouter');

app.use(session({
	secret: "ANANASHI!~",
	resave: false,
	saveUninitialized: false,
}));
app.use(cookies());
app.use(methodOverride('_method'));
app.use(userLoggedMiddleware);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './public')));  

app.set('views', path.join(__dirname, './src/views'));

app.use('/', mainRouter);
app.use('/users', usersRouter);



app.listen(process.env.PORT || 3003, () => {
    console.log("Servidor ON MAKINOLA");
});