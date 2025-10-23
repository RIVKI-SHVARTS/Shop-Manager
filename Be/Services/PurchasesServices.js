
const  storeModel  = require("../Models/storeModel")
const {Purchases} = storeModel

const GetAllPurchases = async () => {
    try {
        const purchases = await Purchases.find({})
        return purchases
    } catch (error) {
        throw new Error('Error creating order: ' + error.message)

    }
}

const GetPurchaseById = async (id) =>{
    try {
        const Purchase = await Purchases.findById(id)
        return Purchase
    } catch (error) {
        throw new Error('Error creating order: ' + error.message)

    } 
}
const AddPurchase = async (PurchaseObj) =>{
    try {
        const newPurchase = new Purchases(PurchaseObj)
         await newPurchase.save()
         return "Created"
    } catch (error) {
        throw new Error('Error creating order: ' + error.message)

    }
}

const UpdaetPurchases = async(id, PurchaseObj)=>{
    try {
         await Purchases.findByIdAndUpdate(id, PurchaseObj)
         return "Updaeted"
    } catch (error) {
        throw new Error('Error creating order: ' + error.message)

    }  
}

const DeletePurchases = async(id)=>{
    try {
         await Purchases.findByIdAndDelete(id)
         return "Deleted"
    } catch (error) {
        throw new Error('Error creating order: ' + error.message)

    }  
}

module.exports = {
    DeletePurchases, UpdaetPurchases,AddPurchase,GetPurchaseById,GetAllPurchases
}