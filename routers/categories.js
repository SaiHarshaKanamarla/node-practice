var express = require('express');
const router = express.Router();

const category = require("../models/category");
const Product = require("../models/product");

router.get('/category_test', (req, res) => {
    res.send("works!");
})

router.get('/all', async (req, res) => {
    const categories = await category.find({});
    res.send(categories);
})

router.get("/category/:id", async (req, res) => {
    const catId = req.params.id;
    const result = await category.findById({ _id: catId });
    res.status(200).send(result);
})

router.post('/category', async (req, res) => {
    const catToAdd = new category(req.body);
    try {
        const newCategory = await catToAdd.save();
        res.status(200).send(newCategory);
    }
    catch (err) {
        res.status(500).send(err);
    }
})

router.patch('/category/:id', async (req, res) => {
    const catId = req.params.id;
    const fetchedCat = await category.findById({ _id: catId });

    let updates = Object.keys(req.body);
    updates.forEach((update) => {
        fetchedCat[update] = req.body[update];
    })
    await fetchedCat.save();
    res.status(200).send(fetchedCat);
})

router.delete('/category/:id', async (req, res) => {
    const catId = req.params.id;
    const catToDelete = await category.findOneAndDelete({ _id: catId });
    if (!catToDelete) {
        res.status(404).send("Category not found");
    }
    await Product.deleteMany({ category: catId });
    res.status(200).send("Category Deleted SuccessFully");

})

module.exports = router;