const express = require('express');
const moongoose = require('mongoose');

const productRoute = require('./route/product-route');
const userRoute = require('./route/user-route');

const app = express();

app.use(express.json());


app.use('/products', productRoute);

app.use('/auth', userRoute);


app.get('/', (req, res) => {
    res.send('Welcome to the E-commerce API');
})

app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
})

moongoose.connect("mongodb+srv://moorthy:1234567890@cluster0.lc8mlrc.mongodb.net/e-commerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });
