const CustomersService = require("../Services/CustomersServices")
const express = require("express")
const CustomersRouter = express.Router()

CustomersRouter.get("/",async(req,res)=>{
    try{
        const Customers = await CustomersService.GetAllCustomers()
        return res.json(Customers)

    }catch(e) {
        return res.json({msg: e.message})
    }
})

CustomersRouter.get("/:id",async(req,res)=>{
    try{
        const {id} = req.params 
        const Customer = await CustomersService.GetCustomersById(id)
        return res.json(Customer)

    }catch(e) {
        return res.json({msg: e.message})
    }
})


CustomersRouter.post("/",async(req,res)=>{
    try{
        const newCustomer = req.body 
        const status = await CustomersService.AddCustomer(newCustomer)
        return res.json({msg: status})

    }catch(e) {
        return res.json({msg: e.message})
    }
})

CustomersRouter.put("/:id",async(req,res)=>{
    try{
        const {id} = req.params 
        const newCustomer = req.body 
        const status = await CustomersService.UpdateCustomers(id,newCustomer)
        // const status = await CustomersService.UpdaetCustomers(id ,newProduct)
        return res.json({msg: status})

    }catch(e) {
        return res.json({msg: e.message})
    }
})


CustomersRouter.delete  ("/:id",async(req,res)=>{
    try{
        const {id} = req.params 
        const status = await CustomersService.DeleteCustomers(id)
        return res.json({msg: status})

    }catch(e) {
        return res.json({msg: e.message})
    }
})

module.exports = CustomersRouter
