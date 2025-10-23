import axios from "axios"

const url = "http://127.0.0.1:8000/customers"

const getAllCustomers = async () => {
    const { data } = await axios.get(url)
    return data
}

const getCustomerById = async (id) => {
    const { data } = await axios.get(`${url}/${id}`)
    return data

}


const addCustomers = async (newCustomer) => {
    const { data } = await axios.post(url, newCustomer) // data= {msg: "Created"}
    return data
}


const updateCustomer = async (id, newCustomerData) => {
    const {data} = await axios.put(`${url}/${id}`, newCustomerData) 
    // data= {msg: "Updated"}
    return data

}

const deleteCustomer = async (id) => {
    const { data } = await axios.delete(`${url}/${id}`)
    
    // data= {msg: "Deleted"}
    return data

}

export {deleteCustomer,updateCustomer,addCustomers,getCustomerById,getAllCustomers}