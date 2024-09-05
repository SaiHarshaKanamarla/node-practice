const mongoose = require('mongoose');
const Product = require("./product");

const categorySchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true }
})

categorySchema.pre('remove', async function (next) {
    const category = this;
    await Product.deleteMany({ category: category._id });
    next();
});

const category = mongoose.model('category', categorySchema);

module.exports = category;