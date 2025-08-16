const express = require('express');

const router = express.Router();
const {addProduct, getProducts, deleteProduct} = require('../controller/product-controller');

router.get('/', async (req, res) => {
    getProducts(req, res);
})

router.post('/', async (req, res) => {
    addProduct(req, res);
})

router.delete('/:title', async (req, res) => {
    deleteProduct(req, res);
});

module.exports = router