const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const {verifyToken} = require('./utils/token-verification');

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

// app.use(mongoSanitizer())

app.use(cors({
    origin: 'http://localhost:3333', // Adjust this to your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))


app.use(express.json());


app.use('/products', verifyToken,  productRoute);

app.use('/auth', userRoute);


app.get('/', (req, res) => {
    res.send('Welcome to the E-commerce API');
})

app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
})

app.use(rateLimit({ 
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per window
}));

app.use('/auth/login', rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes   
  max: 5 // limit each IP to 5 requests per window)
}));


console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });

app.use((err, req, res, next) => {
    console.error("Error occurred:", err);
    res.status(500).json({ message: "Internal Server Error" });
});
