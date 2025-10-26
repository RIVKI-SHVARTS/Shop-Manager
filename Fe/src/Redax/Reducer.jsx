
const initialState = {
    purchases: [],
    products: [],
    customers: [],
    customer: {},

};

function reducer(state = initialState, action) {

    switch (action.type) {
        case "ADD_PURCHASES":
            return { ...state, purchases: action.payload };
        case "ADD_PRODUCTS":
            return { ...state, products: action.payload };
        case "ADD_CUSTOMERS":
            return { ...state, customers: action.payload };
        case "ADD_CUSTOMER_BY_ID":
            return { ...state, customer: action.payload };
        default:
            return state;
    }
}



export default reducer;

