const PurchasesService = require("../Services/PurchasesServices")
const express = require("express")
const PurchasesRouter = express.Router()

PurchasesRouter.get("/",async(req,res)=>{
    try{
        const Purchases = await PurchasesService.GetAllPurchases()
        return res.json(Purchases)

    }catch(e) {
        return res.json({msg: e.message})
    }
})

PurchasesRouter.get("/:id",async(req,res)=>{
    try{
        const {id} = req.params 
        const Purchase = await PurchasesService.GetPurchaseById(id)
        return res.json(Purchase)

    }catch(e) {
        return res.json({msg: e.message})
    }
})


PurchasesRouter.post("/",async(req,res)=>{
    try{
        const newPurchase = req.body 
        const status = await PurchasesService.AddPurchase(newPurchase)
        return res.json({msg: status})

    }catch(e) {
        return res.json({msg: e.message})
    }
})

PurchasesRouter.put("/:id",async(req,res)=>{
    try{
        const {id} = req.params 
        const newPurchase = req.body 
        const status = await PurchasesService.UpdaetPurchases(id ,newPurchase)
        return res.json({msg: status})

    }catch(e) {
        return res.json({msg: e.message})
    }
})


PurchasesRouter.delete("/:id",async(req,res)=>{
    try{
        const {id} = req.params 
        const status = await PurchasesService.DeletePurchases(id)
        return res.json({msg: status})

    }catch(e) {
        return res.json({msg: e.message})
    }
})

module.exports = PurchasesRouter

