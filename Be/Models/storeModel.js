const mongoose  = require("mongoose")

const ProductsSchema = new mongoose.Schema({
    ID:String,
    Name:String,
    Price:Number,
    Quantity:Number 
}, {versionKey: false})
const CustomersSchema = new mongoose.Schema({
    ID:String,
    FirstName:String,
    LastName:String,
    City:String 
}, {versionKey: false})

const PurchasesSchema = new mongoose.Schema({
    ID: String,
    CustomerID: String,
    ProductID: String,
    Data:Object 
}, {versionKey: false})

module.exports = {
    Products: mongoose.model("Product",ProductsSchema),
    Customers: mongoose.model("Customer",CustomersSchema),
    Purchases: mongoose.model("Purchase",PurchasesSchema)
}



