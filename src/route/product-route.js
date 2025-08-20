const express = require('express');
const {allowRole} = require('../utils/token-verification');

const router = express.Router();
const {addProduct, getProducts, deleteProduct, updateProduct} = require('../controller/product-controller');

router.get('/', async (req, res) => {
    getProducts(req, res);
})

router.post('/', allowRole("admin"), async (req, res) => {
    addProduct(req, res);
})

router.delete('/:id', allowRole("admin"), async (req, res) => {
    deleteProduct(req, res);
});

router.put('/:id',allowRole("admin"), async (req, res) => {
    updateProduct(req, res);
});


module.exports = router