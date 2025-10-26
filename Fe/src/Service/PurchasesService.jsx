import axios from "axios"

const url = "http://127.0.0.1:8000/purchases"

const getAllPurchases = async () => {
    const { data } = await axios.get(url)
    return data
}

const getPurchaseById = async (id) => {
    const { data } = await axios.get(`${url}/${id}`)
    return data

}


const addPurchases = async (newPurchases) => {
    const { data } = await axios.post(url, newPurchases) // data= {msg: "Created"}
    return data
}

const updatePurchases = async (id, newPurchasesData) => {
    const {data} = await axios.put(`${url}/${id}`, newPurchasesData) 
    // data= {msg: "Updated"}
    return data

}

const deletePurchases = async (id) => {
    const { data } = await axios.delete(`${url}/${id}`)
    
    // data= {msg: "Deleted"}
    return data

}

export {getAllPurchases,getPurchaseById,addPurchases,updatePurchases,deletePurchases}