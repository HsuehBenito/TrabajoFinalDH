const express = require('express');
const path = require('path');
const app = express();

const mainRouter = require('./src/routes/mainRouter')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './public')));  


app.set('views', path.join(__dirname, './src/views'));

app.use('/', mainRouter);

app.listen(process.env.PORT || 3002, () => {
    console.log("Servidor ON MAKINOLA");
});