

// import {  getProductById, updateProduct } from "../Service/ProductsService";
// import { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from "react-redux";
// import { deletePurchases } from "../Service/PurchasesService";
// import { setPurchases, setAllProducts } from './StoreInformation';
// import Alert from './Alert';

// function Purchases() {
//     const dispatch = useDispatch();

//     const allProducts = useSelector((store) => store.products);
//     const allCustomers = useSelector((store) => store.customers);
//     const allPurchases = useSelector((store) => store.purchases);

//     const [customersOption, setCustomersOption] = useState('');
//     const [productsOption, setProductsOption] = useState('');
//     const [selectedDate, setSelectedDate] = useState('');
//     const [isExist, setIsExist] = useState(false);
//     const [theTableAccordingTo, setTheTableAccordingTo] = useState(allPurchases);

//     const [showAlert, setShowAlert] = useState(false);
//     const [alertMessage, setAlertMessage] = useState('');
//     const [alertType, setAlertType] = useState('success');
//     const [confirmDeleteId, setConfirmDeleteId] = useState(null);
//     const [confirmDeleteProductId, setConfirmDeleteProductId] = useState(null)

//     useEffect(() => {
//         let filtered = allPurchases;

//         if (customersOption) {
//             filtered = filtered.filter(p => p.CustomerID === customersOption);
//         }

//         if (productsOption) {
//             filtered = filtered.filter(p => p.ProductID === productsOption);
//         }

//         if (selectedDate) {
//             const dateParts = selectedDate.split("-");
//             const formattedDate = `${parseInt(dateParts[2])}/${parseInt(dateParts[1])}/${dateParts[0]}`;
//             filtered = filtered.filter(p => p.Data.Date.startsWith(formattedDate));
//         }

//         setTheTableAccordingTo(filtered);
//     }, [customersOption, productsOption, selectedDate, allPurchases]);

//     const handleDelete = (p) => {
//         setConfirmDeleteId(p._id);
//         setConfirmDeleteProductId(p.ProductID)
//         setAlertType("confirmDelete");
//         setAlertMessage("Are you sure you want to delete this purchase?");
//         setShowAlert(true);
//     };

//     const updateQuantities = async (id) => {
//         const productToUpdate = await getProductById(id);
//         console.log(productToUpdate);
//         const newProduct = { ...productToUpdate, Quantity: productToUpdate.Quantity + 1 };
//         await updateProduct(id, newProduct);
//         setAllProducts(dispatch);
//     };

//     const confirmDelete = async () => {
//         try {
//             const res = await deletePurchases(confirmDeleteId);
//             await setPurchases(dispatch);
//             await updateQuantities(confirmDeleteProductId)
//             await setAllProducts(dispatch)
//             setAlertMessage(res.msg || "Deleted successfully.");
//             setAlertType("success");
//         } catch (error) {
//             console.error("Error deleting:", error);
//             setAlertMessage("Error deleting. Please try again.");
//             setAlertType("error");
//         } finally {
//             setConfirmDeleteId(null);
//             setShowAlert(true);
//         }
//     };



//     return (
//         <div className="card-container">
//             {showAlert && (
//                 <Alert
//                     message={alertMessage}
//                     type={alertType}
//                     onClose={() => setShowAlert(false)}
//                     onConfirmDelete={confirmDeleteId ? confirmDelete : null}
//                     onCancel={() => {
//                         setConfirmDeleteId(null);
//                         setShowAlert(false);
//                     }}
//                 />
//             )}

//             <h1>Purchases</h1>

//             <div>
//                 <select value={customersOption} onChange={(e) => setCustomersOption(e.target.value)}>
//                     <option value="" disabled>Choose Customer</option>
//                     {allCustomers?.map((c) => (
//                         <option key={c._id} value={c._id}>
//                             {c.FirstName} {c.LastName}
//                         </option>
//                     ))}
//                 </select>
//                 <button onClick={() => setCustomersOption('')}>Clear Customer</button>
//             </div>

//             <div>
//                 <select value={productsOption} onChange={(e) => setProductsOption(e.target.value)}>
//                     <option value="" disabled>Choose Product</option>
//                     {allProducts?.map((p) => (
//                         <option key={p._id} value={p._id}>
//                             {p.Name}
//                         </option>
//                     ))}
//                 </select>
//                 <button onClick={() => setProductsOption('')}>Clear Product</button>
//             </div>

//             <div>
//                 <label>
//                     Choose a date:
//                     <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
//                 </label>
//                 <button onClick={() => setSelectedDate('')}>Clear Date</button>
//             </div>

//             <button onClick={() => setIsExist(!isExist)}>
//                 {isExist ? "Hide Purchases" : "Show Purchases"}
//             </button>

//             {isExist && (
//                 <div>
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Customer Name</th>
//                                 <th>Bought Product</th>
//                                 <th>Date</th>
//                                 <th></th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {theTableAccordingTo.map((p) => (
//                                 <tr key={p._id}>
//                                     <td>{p.Data.CustomerName}</td>
//                                     <td>{p.Data.ProductBought}</td>
//                                     <td>{p.Data.Date}</td>
//                                     <td>
//                                         <button className="btn-delete" onClick={() => handleDelete(p)}>DELETE</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default Purchases;




// ✅ שינוי: הסרתי getAllProducts כי לא בשימוש
import { getProductById, updateProduct } from "../Service/ProductsService";

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { deletePurchases } from "../Service/PurchasesService";
import { setPurchases, setAllProducts } from './StoreInformation';
import Alert from './Alert';

function Purchases() {
    const dispatch = useDispatch();

    const allProducts = useSelector((store) => store.products);
    const allCustomers = useSelector((store) => store.customers);
    const allPurchases = useSelector((store) => store.purchases);

    const [customersOption, setCustomersOption] = useState('');
    const [productsOption, setProductsOption] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [isExist, setIsExist] = useState(false);
    // ✅ שיפור: אתחול בריק במקום allPurchases - הסינון ממילא ב-useEffect
    const [theTableAccordingTo, setTheTableAccordingTo] = useState([]);

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [confirmDeleteProductId, setConfirmDeleteProductId] = useState(null);

    // ✅ שיפור: חילוץ עיבוד תאריך לפונקציה
    const formatDate = (dateStr) => {
        const [year, month, day] = dateStr.split("-");
        return `${parseInt(day)}/${parseInt(month)}/${year}`;
    };

    useEffect(() => {
        let filtered = allPurchases;

        if (customersOption) {
            filtered = filtered.filter(p => p.CustomerID === customersOption);
        }

        if (productsOption) {
            filtered = filtered.filter(p => p.ProductID === productsOption);
        }

        if (selectedDate) {
            const formattedDate = formatDate(selectedDate);
            filtered = filtered.filter(p => p.Data.Date.startsWith(formattedDate));
        }

        setTheTableAccordingTo(filtered);
    }, [customersOption, productsOption, selectedDate, allPurchases]);

    const handleDelete = (p) => {
        setConfirmDeleteId(p._id);
        setConfirmDeleteProductId(p.ProductID);
        setAlertType("confirmDelete");
        setAlertMessage("Are you sure you want to delete this purchase?");
        setShowAlert(true);
    };

    const updateQuantities = async (id) => {
        try {
            const productToUpdate = await getProductById(id);
            // ✅ שינוי: הסרת console.log מיותר
            const newProduct = { ...productToUpdate, Quantity: productToUpdate.Quantity + 1 };
            await updateProduct(id, newProduct);
            setAllProducts(dispatch);
        } catch (error) {
            console.error("Error updating product quantity:", error);
        }
    };

    const confirmDelete = async () => {
        try {
            const res = await deletePurchases(confirmDeleteId);
            await setPurchases(dispatch);
            await updateQuantities(confirmDeleteProductId);
            // ✅ שינוי: הסרת setAllProducts כפול - לא צריך כאן כי נקרא ב-updateQuantities
            setAlertMessage(res.msg || "Deleted successfully.");
            setAlertType("success");
        } catch (error) {
            console.error("Error deleting:", error);
            setAlertMessage("Error deleting. Please try again.");
            setAlertType("error");
        } finally {
            setConfirmDeleteId(null);
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
                    onConfirmDelete={confirmDeleteId ? confirmDelete : null}
                    onCancel={() => {
                        setConfirmDeleteId(null);
                        setShowAlert(false);
                    }}
                />
            )}

            <h1>Purchases</h1>

            <div>
                <select value={customersOption} onChange={(e) => setCustomersOption(e.target.value)}>
                    <option value="" disabled>Choose Customer</option>
                    {allCustomers?.map((c) => (
                        <option key={c._id} value={c._id}>
                            {c.FirstName} {c.LastName}
                        </option>
                    ))}
                </select>
                <button onClick={() => setCustomersOption('')}>Clear Customer</button>
            </div>

            <div>
                <select value={productsOption} onChange={(e) => setProductsOption(e.target.value)}>
                    <option value="" disabled>Choose Product</option>
                    {allProducts?.map((p) => (
                        <option key={p._id} value={p._id}>
                            {p.Name}
                        </option>
                    ))}
                </select>
                <button onClick={() => setProductsOption('')}>Clear Product</button>
            </div>

            <div>
                <label>
                    Choose a date:
                    <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                </label>
                <button onClick={() => setSelectedDate('')}>Clear Date</button>
            </div>

            <button onClick={() => setIsExist(!isExist)}>
                {isExist ? "Hide Purchases" : "Show Purchases"}
            </button>

            {isExist && (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Bought Product</th>
                                <th>Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {theTableAccordingTo.map((p) => (
                                <tr key={p._id}>
                                    <td>{p.Data.CustomerName}</td>
                                    <td>{p.Data.ProductBought}</td>
                                    <td>{p.Data.Date}</td>
                                    <td>
                                        <button className="btn-delete" onClick={() => handleDelete(p)}>DELETE</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Purchases;
