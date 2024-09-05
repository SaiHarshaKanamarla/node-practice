const express = require('express');
const router = express.Router();

const product = require("../models/product");

router.get("/productTest", (req, res) => {
    res.send("Product route works");
})

router.get("/allProducts", async (req, res) => {
    const products = await product.find({});
    res.status(200).send(products);
});

router.get("/product/:id", async (req, res) => {
    const pId = req.params.id;
    const result = await product.findById({ _id: pId });
    res.status(200).send(result);
});

router.post('/product', async (req, res) => {
    const productToAdd = new product(req.body);
    try {
        const newProduct = await productToAdd.save();
        res.status(200).send(newProduct);
    }
    catch (err) {
        res.status(500).send(err);
    }
})

router.patch('/product/:id', async (req, res) => {
    const pId = req.params.id;
    const fetchedProd = await product.findById({ _id: pId });

    let updates = Object.keys(req.body);
    updates.forEach((update) => {
        fetchedProd[update] = req.body[update];
    })
    await fetchedProd.save();
    res.status(200).send(fetchedProd);
})

router.delete('/product/:id', async (req, res) => {
    const pId = req.params.id;
    const prodToDelete = await product.findOneAndDelete({ _id: pId });
    if (!prodToDelete) {
        res.status(404).send("Product not found");
    }
    res.status(200).send("Product Deleted SuccessFully");

})

router.get('/product/cat/:catId', async (req, res) => {
    const catId = req.params.catId;
    const products = await product.find({ category: catId });
    res.status(200).send(products)
})

module.exports = router;