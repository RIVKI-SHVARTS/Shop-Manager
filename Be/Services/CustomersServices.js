
const  storeModel  = require("../Models/storeModel")
const {Customers} = storeModel

const GetAllCustomers = async () => {
    try {
        const customers = await Customers.find({})
        return customers
    } catch (error) {
        throw new Error('Error creating order: ' + error.message)

    }
}

const GetCustomersById = async (id) =>{
    try {
        const Customer = await Customers.findById(id)
        return Customer
    } catch (error) {
        throw new Error('Error creating order: ' + error.message)

    } 
}
const AddCustomer = async (CustomerObj) =>{
    try {
        const newCustomer = new Customers(CustomerObj)
         await newCustomer.save()
         return "Created"
    } catch (error) {
        throw new Error('Error creating order: ' + error.message)

    }
}

const UpdateCustomers = async(id, CustomerObj)=>{
    try {
         await Customers.findByIdAndUpdate(id, CustomerObj)
         return "Updaeted"
    } catch (error) {
        throw new Error('Error creating order: ' + error.message)

    }  
}

const DeleteCustomers = async(id)=>{
    try {
         await Customers.findByIdAndDelete(id)
         return "Deleted"
    } catch (error) {
        throw new Error('Error creating order: ' + error.message)

    }  
}

module.exports = {
    GetAllCustomers, GetCustomersById, AddCustomer, UpdateCustomers, DeleteCustomers
}