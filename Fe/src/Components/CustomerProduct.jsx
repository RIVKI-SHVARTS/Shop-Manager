


// import { useState, useEffect } from "react";
// import { getAllProducts, getProductById, updateProduct } from "../Service/ProductsService";
// import { addPurchases } from "../Service/PurchasesService";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setPurchases, setAllProducts } from "./StoreInformation";

// function Customer_Product(props) {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [productsList, setProductsList] = useState([]);
//     const [ProductsOption, setProductsOption] = useState('');
//     const [currentDateTime, setCurrentDateTime] = useState('');
//     const [isExist, setIsExist] = useState(false);

//     useEffect(() => {
//         const fetchAllProducts = async () => {
//             const products = await getAllProducts();
//             setProductsList(products);
//         };
//         fetchAllProducts();
//     }, []);

//     useEffect(() => {
//         const updateDateTime = () => {
//             const now = new Date();
//             const day = now.getDate();
//             const month = now.getMonth() + 1;
//             const year = now.getFullYear();
//             const hours = now.getHours();
//             const minutes = now.getMinutes();

//             const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;
//             setCurrentDateTime(formattedDateTime);
//         };

//         updateDateTime();
//         const interval = setInterval(updateDateTime, 10000);
//         return () => clearInterval(interval);
//     }, []);

//     const handleChangeProducts = (event) => {
//         setProductsOption(event.target.value);
//     };

//     const updateQuantities = async (id) => {
//         const productToUpdate = await getProductById(id);
//         console.log(productToUpdate);
//         const newProduct = { ...productToUpdate, Quantity: productToUpdate.Quantity - 1 };
//         await updateProduct(id, newProduct);
//         setAllProducts(dispatch);
//     };

//     const Save = async () => {
//         const selectedProduct = productsList.find(product => product._id === ProductsOption);

//         if (selectedProduct) {
//             const dataToPurchase = {
//                 ProductID: selectedProduct._id,
//                 CustomerID: props.CustomerData.CustomerID,
//                 Data: {
//                     CustomerName: props.CustomerData.Data.CustomerName,
//                     ProductBought: selectedProduct.Name,
//                     Date: currentDateTime
//                 }
//             };
//             await addPurchases(dataToPurchase);
//             await setPurchases(dispatch);
//             await updateQuantities(selectedProduct._id);
//             setIsExist(!isExist);
//         }
//     };

//     const navigateEditCustomer = () => {
//         if (props.CustomerData) {
//             sessionStorage.setItem("CustomerData", JSON.stringify(props.CustomerData));
//         }
//         navigate("/EditCustomer");
//     };

//     return (
//         <div className="customer-product-container">
//             <span
//                 className="link"
//                 onClick={navigateEditCustomer}>
//                 {props.CustomerData.Data.CustomerName}
//             </span>
//             <br />
//             <span className="purchase-date">Date: {props.CustomerData.Data.Date}</span>
//             <br />
//             <button className="add-button" onClick={() => setIsExist(!isExist)}>ADD</button>
//             {isExist === true ? (
//                 <div className="product-select-container">
//                     <select value={ProductsOption} onChange={handleChangeProducts}>
//                         <option value="" disabled>Choose Product</option>
//                         {productsList?.map((product) => (
//                             <option key={product._id} value={product._id}>
//                                 {product.Name}
//                             </option>
//                         ))}
//                     </select>
//                     <br /> <br />
//                     <button className="save-button" onClick={Save}>Save</button>
//                 </div>
//             ) : null}
//         </div>
//     );
// }

// export default Customer_Product;


import { useState, useEffect } from "react";
import { getAllProducts, getProductById, updateProduct } from "../Service/ProductsService";
import { addPurchases } from "../Service/PurchasesService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPurchases, setAllProducts } from "./StoreInformation";

function Customer_Product(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [productsList, setProductsList] = useState([]);
    const [productsOption, setProductsOption] = useState(''); // 🟢 שונה לשם בפורמט camelCase עקבי
    const [currentDateTime, setCurrentDateTime] = useState('');
    const [isExist, setIsExist] = useState(false);

    useEffect(() => {
        const fetchAllProducts = async () => {
            const products = await getAllProducts();
            setProductsList(products);
        };
        fetchAllProducts();
    }, []);

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const day = now.getDate();
            const month = now.getMonth() + 1;
            const year = now.getFullYear();
            const hours = String(now.getHours()).padStart(2, '0'); // 🟢 הוספתי padStart לשמירה על פורמט עם 0
            const minutes = String(now.getMinutes()).padStart(2, '0'); // 🟢 כנ"ל
            const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;
            setCurrentDateTime(formattedDateTime);
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 10000);
        return () => clearInterval(interval);
    }, []);

    const handleChangeProducts = (event) => {
        setProductsOption(event.target.value); // 🟢 מעודכן לשם החדש
    };

    const updateQuantities = async (id) => {
        const productToUpdate = await getProductById(id);
        const newProduct = { ...productToUpdate, Quantity: productToUpdate.Quantity - 1 };
        await updateProduct(id, newProduct);
        await setAllProducts(dispatch); // 🟢 הוספתי await לוודא עדכון לפני ההמשך
    };

    const Save = async () => {
        const selectedProduct = productsList.find(product => product._id === productsOption); // 🟢 שם משתנה מעודכן

        if (selectedProduct) {
            const dataToPurchase = {
                ProductID: selectedProduct._id,
                CustomerID: props.CustomerData.CustomerID,
                Data: {
                    CustomerName: props.CustomerData.Data.CustomerName,
                    ProductBought: selectedProduct.Name,
                    Date: currentDateTime
                }
            };
            await addPurchases(dataToPurchase);
            await setPurchases(dispatch);
            await updateQuantities(selectedProduct._id);
            setIsExist(false); // 🟢 עדכון ל-false בסיום, סוגר את תיבת הבחירה
        }
    };

    const navigateEditCustomer = () => {
        if (props.CustomerData) {
            sessionStorage.setItem("CustomerData", JSON.stringify(props.CustomerData));
        }
        navigate("/EditCustomer");
    };

    return (
        <div className="customer-product-container">
            <span
                className="link"
                onClick={navigateEditCustomer}>
                {props.CustomerData.Data.CustomerName}
            </span>
            <br />
            <span className="purchase-date">Date: {props.CustomerData.Data.Date}</span>
            <br />
            <button className="add-button" onClick={() => setIsExist(!isExist)}>ADD</button>
            {isExist && ( // 🟢 כתיבה נקייה יותר: אין צורך === true
                <div className="product-select-container">
                    <select value={productsOption} onChange={handleChangeProducts}> {/* 🟢 שם מעודכן */}
                        <option value="" disabled>Choose Product</option>
                        {productsList?.map((product) => (
                            <option key={product._id} value={product._id}>
                                {product.Name}
                            </option>
                        ))}
                    </select>
                    <br /> <br />
                    <button className="save-button" onClick={Save}>Save</button>
                </div>
            )}
        </div>
    );
}

export default Customer_Product;
