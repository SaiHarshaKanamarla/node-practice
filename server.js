const express = require('express');
var app = express();
const cors = require('cors');
require("./db/mongoose");

const port = 8080;
const category_router = require("./routers/categories");
const productRouter = require("./routers/products");
const playerRouter = require("./routers/players");
app.use(express.json());
app.use(cors())
// app.use(category_router);
// app.use(productRouter);
app.use(playerRouter);

app.get('/test', (req, res) => {
    res.send("Succe4ss");
})

app.listen(port)

module.exports = app;