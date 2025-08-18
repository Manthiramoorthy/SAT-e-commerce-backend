const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const mongoSanitizer = require('express-mongo-sanitize');

require('dotenv').config();


const productRoute = require('./route/product-route');
const userRoute = require('./route/user-route');

const app = express();

// helmet is a middleware that helps secure Express apps by setting various HTTP headers
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "'https://images.cdn.com'"],
        connectSrc: ["'self'", "https://api.example.com"]
    }
}));

app.use(mongoSanitizer())

app.use(cors({
    origin: 'http://localhost:3333', // Adjust this to your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))


app.use(express.json());


app.use('/products', productRoute);

app.use('/auth', userRoute);


app.get('/', (req, res) => {
    res.send('Welcome to the E-commerce API');
})

app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
})

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });
