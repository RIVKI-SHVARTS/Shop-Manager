const express = require('express');
const app = express();
const port = 8000;

const cors = require("cors")
const mongoose = require("mongoose")


mongoose.connect("mongodb://127.0.0.1:27017/project_3").then(() => console.log("Connected to DB"))

app.use(express.json())
app.use(cors())



const ProductsController = require("./Controllers/ProductsController")
app.use("/products", ProductsController)

const CustomersController = require("./Controllers/CustomersController")
app.use("/customers", CustomersController)

const PurchasesController = require("./Controllers/PurchasesController")
app.use("/purchases", PurchasesController)

app.listen(port, () => {
    console.log(`Server is running at http://127.0.0.1:${port}`);
});