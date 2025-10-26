

export const doAddPurchases = (purchases) => {
    return {
        type: "ADD_PURCHASES",
        payload: purchases
    }
}

export const doAddProducts = (products) => {
    return {
        type: "ADD_PRODUCTS",
        payload: products
    }
}

export const doAddCustomers = (customers)=>{
    return{
        type: "ADD_CUSTOMERS",
        payload: customers
    }
}

export const doAddCustomerByID = (customer)=>{
    return{
        type: "ADD_CUSTOMER_BY_ID",
        payload: customer
    }
}