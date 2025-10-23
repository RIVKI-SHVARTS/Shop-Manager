const ProductsService = require("../Services/ProductsServices")
const express = require("express")
const ProductsRouter = express.Router()

ProductsRouter.get("/",async(req,res)=>{
    try{
        const Products = await ProductsService.GetAllProducts()
        return res.json(Products)

    }catch(e) {
        return res.json({msg: e.message})
    }
})

ProductsRouter.get("/:id",async(req,res)=>{
    try{
        const {id} = req.params 
        const Product = await ProductsService.GetProductsById(id)
        return res.json(Product)

    }catch(e) {
        return res.json({msg: e.message})
    }
})


ProductsRouter.post("/",async(req,res)=>{
    try{
        const newProduct = req.body 
        const status = await ProductsService.Addproduct(newProduct)
        return res.json({msg: status})

    }catch(e) {
        return res.json({msg: e.message})
    }
})

ProductsRouter.put("/:id",async(req,res)=>{
    try{
        const {id} = req.params 
        const newProduct = req.body 
        const status = await ProductsService.UpdaetProducts(id ,newProduct)
        return res.json({msg: status})

    }catch(e) {
        return res.json({msg: e.message})
    }
})


ProductsRouter.delete("/:id",async(req,res)=>{
    try{
        const {id} = req.params 
        const status = await ProductsService.DeleteProducts(id)
        return res.json({msg: status})

    }catch(e) {
        return res.json({msg: e.message})
    }
})

module.exports = ProductsRouter
