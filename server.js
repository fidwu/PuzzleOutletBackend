const express = require('express');
const morgan = require('morgan');
const mongoose = require("mongoose");
require('dotenv').config();
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const cartRouter = require('./routes/cartRouter');
const pastOrdersRouter = require('./routes/pastOrdersRouter');
const itemsRouter = require('./routes/ItemRouter');
const userRouter = require('./routes/userRouter');

const port = process.env.PORT || 3001;

// MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
  
mongoose.connection.on('connected', () => {
    console.log("Mongoose connected");
});

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(session({ 
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60*60*1000
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/cart', cartRouter);
app.use('/orders', pastOrdersRouter);
app.use('/items', itemsRouter);
app.use('/users', userRouter);

app.use((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>PuzzleOutlet Backend</h1></body></html>');
});

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});