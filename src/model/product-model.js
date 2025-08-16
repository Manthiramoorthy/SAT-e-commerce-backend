const moongoose = require('mongoose');

const productSchema = new moongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: String
    }
})

module.exports = moongoose.model('products', productSchema);