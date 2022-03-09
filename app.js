const express = require('express');
const session = require('express-session');
const cookies = require('cookie-parser');
const methodOverride = require('method-override');
const app = express();
const path = require('path');
//const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');

app.use(session({
	secret: "Shhh, It's a secret",
	resave: false,
	saveUninitialized: false,
}));

app.use(cookies());

//app.use(userLoggedMiddleware);

app.use(express.urlencoded({ extended: false }));

app.use(express.static('./public'));

app.use(methodOverride('_method'));
// Template Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));
// Routers
const mainRoutes = require('./src/routes/mainRoutes');
const userRoutes = require('./src/routes/userRoutes');

app.use('/', mainRoutes);
app.use('/user', userRoutes);

app.listen(process.env.PORT || 3003, () => console.log('Servidor levantado en el puerto 3003'));