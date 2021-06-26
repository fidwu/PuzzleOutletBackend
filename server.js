const express = require('express');
const morgan = require('morgan');
const mongoose = require("mongoose");
require('dotenv').config();

const cartRouter = require('./routes/cartRouter');
const pastOrdersRouter = require('./routes/pastOrdersRouter');

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

app.use('/cart', cartRouter);
app.use('/orders', pastOrdersRouter);

app.use((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Shoptech Backend</h1></body></html>');
});

// app.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});