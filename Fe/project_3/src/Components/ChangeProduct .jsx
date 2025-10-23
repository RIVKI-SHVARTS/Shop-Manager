
import Alert from "./Alert"
import React, { useEffect, useState } from 'react';
import { updateProduct, deleteProduct, getProductById } from "../Service/ProductsService";
import { getAllPurchases, deletePurchases, updatePurchases } from "../Service/PurchasesService";
import { useDispatch } from "react-redux";
import { setPurchases, setAllProducts } from "./StoreInformation"
import { useNavigate } from 'react-router-dom';

function ChangeProduct() {
    const [productID, setProductID] = useState("");
    const [productValue, setProductValue] = useState({ _id: "", Name: "", Price: "", Quantity: "" });
    const [purchasesId, setPurchasesId] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("success");
    const [idForDeleting, setIdForDeleting] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const storedData = sessionStorage.getItem("product_id");
        if (storedData) {
            setProductID(storedData);
        } else {
            console.error("No ProductID found in sessionStorage");
        }
    }, []);

    useEffect(() => {
        const getProductData = async () => {
            try {
                const productData = await getProductById(productID);
                if (productData) {
                    setProductValue({
                        _id: productData._id,
                        Name: productData.Name,
                        Price: productData.Price,
                        Quantity: productData.Quantity
                    });
                } else {
                    console.error("Product not found");
                    alert("Product not found");
                }
            } catch (error) {
                console.error("Error fetching product data:", error);
                alert("Error fetching product data");
            }
        };

        if (productID) {
            getProductData();
        }
    }, [productID]);

    useEffect(() => {
        const getPurchasesData = async () => {
            if (!productID) return;

            const purchasesData = await getAllPurchases();
            const filtered = purchasesData.filter(
                (purchase) => purchase.ProductID === productID
            );
            setPurchasesId(filtered);
            purchasesId != 0 ?
                console.log(purchasesId) :
                console.log("didn't arrive");
        };

        getPurchasesData();
    }, [productID]);

    useEffect(() => {
        if (showAlert && alertType != "confirmDelete") {
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    const updatePurchasesName = async () => {
        for (let i = 0; i < purchasesId.length; i++) {
            const purchase = { ...purchasesId[i] };
            purchase.Data = { ...purchase.Data, ProductBought: productValue.Name };
            await updatePurchases(purchase._id, purchase);
        }

        await setPurchases(dispatch);
    };

    const SaveChanges = async () => {
        try {
            await updateProduct(productID, productValue);
            await setAllProducts(dispatch);
            await setPurchases(dispatch);
            await updatePurchasesName();

            setAlertMessage("Changes were saved successfully!");
            setAlertType("success");
            setShowAlert(true);
        } catch (error) {
            console.error("Error updating product:", error);
            setAlertMessage("Failed to save changes.");
            setAlertType("error");
            setShowAlert(true);
        }
        setTimeout(() => {
            navigate(-1);
        }, 1500);
    };

    const DeleteConfirmation = () => {
        setIdForDeleting(productID);
        setAlertMessage("Are you sure you want to delete the product?");
        setAlertType("confirmDelete");
        setShowAlert(true);
    };

    const DeleteProduct = async (id) => {
        try {
            await deleteProduct(id);
            await setAllProducts(dispatch);
            if (purchasesId && purchasesId.length > 0) {
                for (const purchase of purchasesId) {
                    await deletePurchases(purchase._id);
                }
            }
            await setPurchases(dispatch);
            setAlertMessage("The product was successfully deleted!");
            setAlertType("delete");
            setShowAlert(true);
        } catch (error) {
            console.error("Error deleting product or purchases:", error);
            setAlertMessage("Failed to delete product or purchases");
            setAlertType("error");
            setShowAlert(true);
        }
        setTimeout(() => {
            navigate(-1);
        }, 1500);
    };

    return (
        <div className="card-container">
            {showAlert && (
                <Alert
                    message={alertMessage}
                    type={alertType}
                    onClose={() => setShowAlert(false)}
                    onConfirmDelete={() => DeleteProduct(idForDeleting)}
                />
            )}
            <br />

            <h1>Change product:</h1>

            <p>
                Name:
                <input
                    type="text"
                    value={productValue.Name}
                    onChange={(e) => setProductValue({ ...productValue, Name: e.target.value })}
                />
            </p>
            <p>
                Price:
                <input
                    type="number"
                    value={productValue.Price}
                    onChange={(e) => setProductValue({ ...productValue, Price: e.target.value })}
                />
            </p>
            <p>
                Quantity:
                <input
                    type="number"
                    value={productValue.Quantity}
                    onChange={(e) => setProductValue({ ...productValue, Quantity: e.target.value })}
                />
            </p>
            <br /><br />
            <button className="btn-save" onClick={SaveChanges}>Save changes</button>
            <button className="btn-delete" onClick={DeleteConfirmation}>Delete Product</button>
        </div>
    );
}

export default ChangeProduct;
