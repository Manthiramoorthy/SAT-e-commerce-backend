const product = require('../model/product-model')

const addProduct = async (req, res) => {
    if (!req.body.title || !req.body.description || !req.body.price) {
        return res.status(400).send('All fields are required');
    }
    try {
        const result = await product.insertOne(req.body)
        if (result) {
            res.status(201).send('Product created successfully');
        } else {
            res.status(500).send('Error creating product');
        }
    } catch (error) {
        console.error("Error creating product:", error);
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await product.find({}, { title: 1, description: 1, price: 1 });
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

const deleteProduct = async (req, res) => {
    if (!req.params.id) {
        return res.status(400).send('Title is required');
    }
    console.log(req.params.title);
    const result = await product.deleteOne({ _id: req.params.id });
    if (result.deletedCount > 0) {
        res.status(200).send('Product deleted successfully');
    } else {
        res.status(404).send('Product not found');
    }
}

const updateProduct = async (req, res) => {
    try {
        const result = await product.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );
        if (result.modifiedCount > 0) {
            res.status(200).send('Product updated successfully');
        } else {
            res.status(404).send('Product not found or no changes made');
        }
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).send('Error updating product');
    }
}

module.exports = {
    addProduct,
    getProducts,
    deleteProduct,
    updateProduct
}