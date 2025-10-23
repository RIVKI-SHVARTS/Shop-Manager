
const  storeModel  = require("../Models/storeModel")
const {Products} = storeModel

const GetAllProducts = async () => {
    try {
        const products = await Products.find({})
        return products
    } catch (error) {
        throw new Error('Error creating order: ' + error.message)

    }
}

const GetProductsById = async (id) =>{
    try {
        const product = await Products.findById(id)
        return product
    } catch (error) {
        throw new Error('Error creating order: ' + error.message)

    } 
}
const Addproduct = async (productObj) =>{
    try {
        const newProduct = new Products(productObj)
         await newProduct.save()
         return "Created"
    } catch (error) {
        throw new Error('Error creating order: ' + error.message)

    }
}

const UpdaetProducts = async(id, productObj)=>{
    try {
         await Products.findByIdAndUpdate(id, productObj)
         return "Updaeted"
    } catch (error) {
        throw new Error('Error creating order: ' + error.message)

    }  
}

const DeleteProducts = async(id)=>{
    try {
         await Products.findByIdAndDelete(id)
         return "Deleted"
    } catch (error) {
        throw new Error('Error creating order: ' + error.message)

    }  
}
// const DeleteProducts = async (id) => {
//     try {
//         // אם אתה עובד עם MongoDB, אפשר להשתמש ב-Mongoose:
//         const result = await Products.findByIdAndDelete(id);  // מחיקת המוצר לפי ה-ID
//         if (!result) {
//             throw new Error("Product not found");
//         }
//         return "Product deleted successfully";
//     } catch (e) {
//         throw new Error("Error deleting product: " + e.message);
//     }
// }

module.exports = {
    GetAllProducts, GetProductsById ,Addproduct ,UpdaetProducts, DeleteProducts
}