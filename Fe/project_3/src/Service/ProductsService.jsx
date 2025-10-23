import axios from "axios"

const url = "http://127.0.0.1:8000/products"

const getAllProducts = async () => {
    const { data } = await axios.get(url)
    return data
}

const getProductById = async (id) => {
    const { data } = await axios.get(`${url}/${id}`)
    return data

}


const addProduct = async (newProduct) => {
    const { data } = await axios.post(url, newProduct) // data= {msg: "Created"}
    return data
}

const updateProduct = async (id, newProductData) => {
    const {data} = await axios.put(`${url}/${id}`, newProductData) 
    // data= {msg: "Updated"}
    return data

}

const deleteProduct = async (id) => {
    const {data} = await axios.delete(`${url}/${id}`)
    
    // data= {msg: "Deleted"}
    return data

}

export {deleteProduct,updateProduct,addProduct,getProductById,getAllProducts}