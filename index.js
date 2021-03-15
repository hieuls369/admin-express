require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

const userRouter = require('./router/user.router');
const authRouter = require('./router/auth.router');
const productRouter = require('./router/product.router');

const sessionMiddle = require('./middleware/session.middleware');

const validation = require('./validate/auth.validate');

app.set('view engine', 'pug');
app.set('views', './page/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddle.session);

app.use(express.static('public'));

app.use('/user', validation.cookie, userRouter);
app.use('/auth', authRouter);
app.use('/product', validation.cookie, productRouter);

app.listen(port, () => { console.log(`Listening to port ${port}`)});