
import { getAllCustomers, getCustomerById } from "../Service/CustomersService";
import { getAllPurchases } from "../Service/PurchasesService";
import { getAllProducts } from "../Service/ProductsService";

import { doAddPurchases, doAddProducts, doAddCustomers, doAddCustomerByID } from "../Redax/Actions";

import { useDispatch } from "react-redux";
import { useEffect } from "react";


export const setCustomers = async (dispatch) => {
    try {
        const allCustomers = await getAllCustomers();
        dispatch(doAddCustomers(allCustomers));
    } catch (error) {
        console.error("Error fetching customers:", error);
    }
};

export const setCustomerByID = async (dispatch, id) => {
    try {
        const customer = await getCustomerById(id);
        dispatch(doAddCustomerByID(customer));
    } catch (error) {
        console.error(`Error fetching customer by ID (${id}):`, error);
    }
};

export const setPurchases = async (dispatch) => {
    try {
        const allPurchases = await getAllPurchases();
        dispatch(doAddPurchases(allPurchases));
    } catch (error) {
        console.error("Error fetching purchases:", error);
    }
};

export const setAllProducts = async (dispatch) => {
    try {
        const allProducts = await getAllProducts();
        dispatch(doAddProducts(allProducts));
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

function StoreInformation() {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {

                await Promise.all([
                    setPurchases(dispatch),
                    setAllProducts(dispatch),
                    setCustomers(dispatch)
                ]);
            } catch (error) {
                console.error("Error loading store data:", error);
            }
        };

        fetchData();
    }, [dispatch]);

    return (
        <div>
        </div>
    );
}

export default StoreInformation;

