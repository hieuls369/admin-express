require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;
//all the router
const userRouter = require('./router/user.router');
const authRouter = require('./router/auth.router');
const productRouter = require('./router/product.router');
const cartRouter = require('./router/cart.router');

//validate cookie for user
const validation = require('./validate/auth.validate');

app.set('view engine', 'pug');
app.set('views', './page/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));

//using static img from internal file
app.use(express.static('public'));

//retrieve router
app.use('/user', validation.cookie, userRouter);
app.use('/auth', authRouter);
app.use('/product', validation.cookie, productRouter);
app.use('/cart', validation.cookie, cartRouter);

app.listen(port, () => { console.log(`Listening to port ${port}`)});