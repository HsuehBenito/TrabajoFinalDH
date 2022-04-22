const express = require('express');
const session = require('express-session');
const cookies = require('cookie-parser');
const methodOverride = require('method-override');
const app = express();
const path = require('path');
const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');
const fetch = require('node-fetch');

app.use(session({
	secret: "ILSECRETOLOCO!@#123",
	resave: false,
	saveUninitialized: false,
}));
app.use(express.json());

app.use(cookies());

app.use(userLoggedMiddleware);

app.use(express.urlencoded({ extended: false }));

app.use(express.static('./public'));

app.use(methodOverride('_method'));
// Template Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));
// Routers
const mainRoutes = require('./src/routes/mainRoutes');
const userRoutes = require('./src/routes/userRoutes');
const apiRoutes = require('./src/routes/apiRoutes');

app.use('/', mainRoutes);
app.use('/user', userRoutes);
app.use('/api', apiRoutes);

app.listen(process.env.PORT || 3003, () => console.log('Servidor levantado en el puerto 3003'));