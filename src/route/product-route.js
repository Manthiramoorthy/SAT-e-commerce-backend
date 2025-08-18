const express = require('express');

const router = express.Router();
const {addProduct, getProducts, deleteProduct, updateProduct} = require('../controller/product-controller');

router.get('/', async (req, res) => {
    getProducts(req, res);
})

router.post('/', async (req, res) => {
    addProduct(req, res);
})

router.delete('/:id', async (req, res) => {
    deleteProduct(req, res);
});

router.put('/:id', async (req, res) => {
    updateProduct(req, res);
});


module.exports = router