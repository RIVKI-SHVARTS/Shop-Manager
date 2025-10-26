import { getAllProducts, getProductById, updateProduct } from "../Service/ProductsService";
import { getAllCustomers } from "../Service/CustomersService";
import { addPurchases } from "../Service/PurchasesService";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPurchases, setAllProducts } from "./StoreInformation";
import Alert from "./Alert";

function BuyProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [productsList, setProductsList] = useState([]);
    const [customersList, setCustomersList] = useState([]);
    const [customersOption, setCustomersOption] = useState('');
    const [productsOption, setProductsOption] = useState(''); 
    const [currentDateTime, setCurrentDateTime] = useState('');

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("success");

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const formattedDateTime = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;
            setCurrentDateTime(formattedDateTime);
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 10000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const products = await getAllProducts();
                const customers = await getAllCustomers();
                setProductsList(products);
                setCustomersList(customers);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const updateQuantities = async (id) => {
        const productToUpdate = await getProductById(id);
        console.log(productToUpdate);
        const newProduct = { ...productToUpdate, Quantity: productToUpdate.Quantity - 1 };
        await updateProduct(id, newProduct);
        await setAllProducts(dispatch);
    };

    const Buy = async () => {
        const selectedCustomer = customersList.find(customer => customer._id === customersOption); 
        const selectedProduct = productsList.find(product => product._id === productsOption); 

        if (!selectedCustomer || !selectedProduct) {
            setAlertMessage("Please select both a customer and a product.");
            setAlertType("error");
            setShowAlert(true);
            return;
        }

        try {

            const dataToPurchase = {
                ProductID: selectedProduct._id,
                CustomerID: selectedCustomer._id,
                Data: {
                    CustomerName: `${selectedCustomer.FirstName} ${selectedCustomer.LastName}`,
                    ProductBought: selectedProduct.Name,
                    Date: currentDateTime
                }
            };

            await addPurchases(dataToPurchase);
            await setPurchases(dispatch);
            await updateQuantities(selectedProduct._id);

            setAlertMessage("Purchase completed successfully.");
            setAlertType("success");
            setShowAlert(true);

            setTimeout(() => {
                navigate("/Customers");
            }, 1500);
        } catch (error) {
            console.error("Error adding purchase:", error);
            setAlertMessage("Something went wrong. Please try again.");
            setAlertType("error");
            setShowAlert(true);
        }
    };

    return (
        <div className="card-container">
            {showAlert && (
                <Alert
                    message={alertMessage}
                    type={alertType}
                    onClose={() => setShowAlert(false)}
                />
            )}

            <h1>Buy Product</h1>

            <select value={customersOption} onChange={(e) => setCustomersOption(e.target.value)}> 
                <option value="" disabled>Choose Customer</option>
                {customersList.map((customer) => (
                    <option key={customer._id} value={customer._id}>
                        {customer.FirstName} {customer.LastName}
                    </option>
                ))}
            </select>

            <select value={productsOption} onChange={(e) => setProductsOption(e.target.value)}> 
                <option value="" disabled>Choose Product</option>
                {productsList.map((product) => (
                    <option key={product._id} value={product._id}>
                        {product.Name}
                    </option>
                ))}
            </select>

            <br /><br />
            <button className="btn-save" onClick={Buy}>Buy</button>
        </div>
    );
}

export default BuyProduct;
