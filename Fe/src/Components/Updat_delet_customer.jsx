

// import { getProductById, updateProduct } from "../Service/ProductsService";
// import { useEffect, useState } from "react";
// import { updateCustomer, deleteCustomer } from "../Service/CustomersService"
// import { updatePurchases, deletePurchases } from "../Service/PurchasesService"
// import { useDispatch, useSelector } from "react-redux";
// import { setCustomerByID, setCustomers, setPurchases,setAllProducts } from "./StoreInformation"
// import { useNavigate } from "react-router-dom";
// import Alert from "./Alert"; 

// function Updat_delet_customer() {

//     const dispatch = useDispatch()
//     const navigate = useNavigate()

//     const allPurchases = useSelector((store) => store.purchases)
//     const customerFromStore = useSelector((store) => store.customer);

//     const [CustomerData, setCustomerData] = useState();
//     const [CustomerName, setCustomerName] = useState();
//     const [isExist, setIsExist] = useState(false)
//     const [newData, setNewData] = useState({ FirstName: "", LastName: "", City: "" });

//     const [showAlert, setShowAlert] = useState(false);
//     const [alertMessage, setAlertMessage] = useState("");
//     const [alertType, setAlertType] = useState("success");
//     const [idForDeleting, setIdForDeleting] = useState(""); 

//     useEffect(() => {
//         const getCustomerData = () => {
//             const response = sessionStorage.getItem("CustomerData");
//             console.log(response);

//             if (response) {
//                 try {
//                     const parsedData = JSON.parse(response);
//                     console.log("Parsed CustomerData:", parsedData);
//                     setCustomerData(parsedData);
//                     parsedData.Data ?
//                         setCustomerName(parsedData.Data.CustomerName) :
//                         setCustomerName(`${parsedData.FirstName} ${parsedData.LastName}`)
//                 } catch (error) {
//                     console.error("Error parsing CustomerData:", error);
//                 }
//             }
//         };
//         getCustomerData();
//     }, []);

//     const getCustomerById = async () => {
//         try {
//             CustomerData.CustomerID ?
//                 await setCustomerByID(dispatch, CustomerData.CustomerID) :
//                 await setCustomerByID(dispatch, CustomerData.ID)

//         } catch (error) {
//             console.error("Error fetching customer:", error);
//         }
//     };

//     useEffect(() => {
//         if (CustomerData &&
//             (CustomerData.CustomerID || CustomerData.ID)) {
//             getCustomerById();
//         } else {
//             console.log("CustomerData didn't arrive yet");
//         }
//     }, [CustomerData]);

//     useEffect(() => {
//         if (showAlert && alertType !== "confirmDelete") {
//             const timer = setTimeout(() => {
//                 setShowAlert(false);
//             }, 1500);
//             return () => clearTimeout(timer);
//         }
//     }, [showAlert]);

//     const handleChange = (e, field) => {
//         setNewData(prevData => ({
//             ...prevData,
//             [field]: e.target.value
//         }));
//     };

//     const updatePurchasIngServer = async (id) => {
//         const promises = [];
//         for (let i = 0; i < allPurchases.length; i++) {
//             const purchase = allPurchases[i];
//             if (purchase.CustomerID === id) {
//                 const newName = ` ${newData.FirstName !== "" ? newData.FirstName : customerFromStore?.FirstName} 
//                 ${newData.LastName !== "" ? newData.LastName : customerFromStore?.LastName}`
//                 const newPurchasData = {
//                     ...purchase,
//                     Data: {
//                         ...purchase.Data,
//                         CustomerName: newName
//                     }
//                 };
//                 console.log("Updating purchase:", purchase.id, newPurchasData);
//                 promises.push(updatePurchases(purchase._id, newPurchasData));
//             }
//         }
//         await Promise.all(promises);
//     };

//     const update = async () => {
//         let id = 0
//         if (CustomerData.CustomerID) {
//             id = CustomerData.CustomerID
//         }
//         else { id = CustomerData.ID }
//         console.log(id);

//         const data = {
//             FirstName: newData.FirstName !== "" ? newData.FirstName : customerFromStore?.FirstName,
//             LastName: newData.LastName !== "" ? newData.LastName : customerFromStore?.LastName,
//             City: newData.City !== "" ? newData.City : customerFromStore?.City,
//             ID: id
//         };
//         await updatePurchasIngServer(id)
//         await setPurchases(dispatch)
//         const response = await updateCustomer(id, data);
//         setCustomers(dispatch)
//         setCustomerName(`${data.FirstName} ${data.LastName}`);
//         setAlertMessage(response.msg);
//         setAlertType("success");
//         setShowAlert(true);
//         setIsExist(false); 

//     }

//     const updateQuantities = async (id) => {
//         const productToUpdate = await getProductById(id);
//         console.log(productToUpdate);
//         const newProduct = { ...productToUpdate, Quantity: productToUpdate.Quantity + 1 };
//         await updateProduct(id, newProduct);
//         setAllProducts(dispatch);
//     };

//     const deletPurchasIngServer = async (id) => {
//         const promises = [];
//         for (let i = 0; i < allPurchases.length; i++) {
//             const purchase = allPurchases[i];
//             if (purchase.CustomerID === id) {
//                 console.log("Deleting purchase:", purchase.id);
//                 console.log("Deleting purchase:", purchase);
//                 await updateQuantities(purchase.ProductID)
//                 promises.push(deletePurchases(purchase._id));
//             }
//         }
//         await Promise.all(promises);

//     };

//     const deleteButton = () => {
//         const id = CustomerData?.CustomerID || CustomerData?._id;

//         if (!id) {
//           console.error("No valid ID for update!");
//           return;
//         }
      
//         setIdForDeleting(id);
//         setAlertMessage(`Are you sure you want to delete ${CustomerName}?`);
//         setAlertType("confirmDelete");
//         setShowAlert(true);
//     }

//     const deleteCustomerAndPurchases = async (id) => {
//         debugger
//         try {
//             const response = await deleteCustomer(id);
//             setCustomers(dispatch)
//             await deletPurchasIngServer(id)
//             await setPurchases(dispatch)
//             setAlertMessage(response.msg);
//             setAlertType("delete");
//             setShowAlert(true);
//         } catch (error) {
//             console.error("Error deleting customer:", error);
//             setAlertMessage("Failed to delete customer or purchases");
//             setAlertType("error");
//             setShowAlert(true);
//         }
//         const timerToNavigate = setTimeout(() => {
//             navigate(-1);
//         }, 1500);
//     }

//     return (
//         <div className="card-container">
//             {showAlert && (
//                 <Alert
//                     message={alertMessage}
//                     type={alertType}
//                     onClose={() => setShowAlert(false)}
//                     onConfirmDelete={() => deleteCustomerAndPurchases(idForDeleting)}
//                 />
//             )}

//             <h1>Update/Delete Customer</h1>

//             <button className="btn-save" onClick={() => setIsExist(!isExist)}>Update {CustomerName}
//             </button><br /><br />

//             {isExist === true ?
//                 <div className="customer-form">
//                     <label>First Name</label>
//                     <input
//                         type="text"
//                         value={newData.FirstName || customerFromStore?.FirstName}
//                         onChange={(e) => handleChange(e, "FirstName")} /><br />

//                     <label>Last Name</label>
//                     <input
//                         type="text"
//                         value={newData.LastName || customerFromStore?.LastName}
//                         onChange={(e) => handleChange(e, "LastName")} /><br />

//                     <label>City</label>
//                     <input
//                         type="text"
//                         value={newData.City || customerFromStore?.City}
//                         onChange={(e) => handleChange(e, "City")} /><br />
//                     <button className="btn-save" onClick={update}>Update Customer</button>
//                 </div> : null
//             }

//             <button className="btn-delete" onClick={deleteButton}>
//                 Delete {CustomerName}
//             </button>
//         </div>
//     );
// }

// export default Updat_delet_customer;



import { getProductById, updateProduct } from "../Service/ProductsService";
import { useEffect, useState } from "react";
import { updateCustomer, deleteCustomer } from "../Service/CustomersService";
import { updatePurchases, deletePurchases } from "../Service/PurchasesService";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerByID, setCustomers, setPurchases, setAllProducts } from "./StoreInformation";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

// ✅ שינוי שם הקומפוננטה לשם נכון לפי קונבנציה של React
function UpdateDeleteCustomer() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allPurchases = useSelector((store) => store.purchases);
  const customerFromStore = useSelector((store) => store.customer);

  // ✅ שינוי שם state לאות קטנה לפי convention
  const [customerData, setCustomerData] = useState();
  const [customerName, setCustomerName] = useState(); // ✅ שינוי שם
  const [isExist, setIsExist] = useState(false);
  const [newData, setNewData] = useState({ FirstName: "", LastName: "", City: "" });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [idForDeleting, setIdForDeleting] = useState("");

  useEffect(() => {
    const getCustomerData = () => {
      const response = sessionStorage.getItem("CustomerData");
      if (response) {
        try {
          const parsedData = JSON.parse(response);
          setCustomerData(parsedData); // ✅ שימוש בשם החדש
          parsedData.Data
            ? setCustomerName(parsedData.Data.CustomerName) // ✅ שם חדש
            : setCustomerName(`${parsedData.FirstName} ${parsedData.LastName}`);
        } catch (error) {
          console.error("Error parsing CustomerData:", error);
        }
      }
    };
    getCustomerData();
  }, []);

  const getCustomerById = async () => {
    try {
      if (customerData.CustomerID) {
        await setCustomerByID(dispatch, customerData.CustomerID);
      } else {
        await setCustomerByID(dispatch, customerData.ID);
      }
    } catch (error) {
      console.error("Error fetching customer:", error);
    }
  };

  useEffect(() => {
    if (customerData && (customerData.CustomerID || customerData.ID)) {
      getCustomerById();
    }
  }, [customerData]);

  useEffect(() => {
    if (showAlert && alertType !== "confirmDelete") {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  const handleChange = (e, field) => {
    setNewData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  // ✅ שינוי שם פונקציה: כתיב נכון ואחיד
  const updatePurchasingServer = async (id) => {
    const promises = allPurchases
      .filter((purchase) => purchase.CustomerID === id) // ✅ החלפת for ב-filter
      .map((purchase) => {
        const newName = `${newData.FirstName || customerFromStore?.FirstName} ${newData.LastName || customerFromStore?.LastName}`;
        const newPurchaseData = {
          ...purchase,
          Data: {
            ...purchase.Data,
            CustomerName: newName,
          },
        };
        return updatePurchases(purchase._id, newPurchaseData);
      });
    await Promise.all(promises);
  };

  const update = async () => {
    const id = customerData.CustomerID || customerData.ID; // ✅ שם חדש
    const data = {
      FirstName: newData.FirstName || customerFromStore?.FirstName,
      LastName: newData.LastName || customerFromStore?.LastName,
      City: newData.City || customerFromStore?.City,
      ID: id,
    };

    await updatePurchasingServer(id); // ✅ שימוש בשם הפונקציה החדש
    await setPurchases(dispatch);
    const response = await updateCustomer(id, data);
    setCustomers(dispatch);
    setCustomerName(`${data.FirstName} ${data.LastName}`);
    setAlertMessage(response.msg);
    setAlertType("success");
    setShowAlert(true);
    setIsExist(false);
  };

  const updateQuantities = async (id) => {
    const productToUpdate = await getProductById(id);
    const newProduct = { ...productToUpdate, Quantity: productToUpdate.Quantity + 1 };
    await updateProduct(id, newProduct);
    setAllProducts(dispatch);
  };

  // ✅ שינוי שם פונקציה: כתיב נכון
  const deletePurchasingServer = async (id) => {
    const promises = allPurchases
      .filter((purchase) => purchase.CustomerID === id)
      .map(async (purchase) => {
        await updateQuantities(purchase.ProductID);
        return deletePurchases(purchase._id);
      });
    await Promise.all(promises);
  };

  const deleteButton = () => {
    const id = customerData?.CustomerID || customerData?._id;
    if (!id) {
      console.error("No valid ID for update!");
      return;
    }
    setIdForDeleting(id);
    setAlertMessage(`Are you sure you want to delete ${customerName}?`);
    setAlertType("confirmDelete");
    setShowAlert(true);
  };

  const deleteCustomerAndPurchases = async (id) => {
    try {
      const response = await deleteCustomer(id);
      setCustomers(dispatch);
      await deletePurchasingServer(id); // ✅ שימוש בשם החדש
      await setPurchases(dispatch);
      setAlertMessage(response.msg);
      setAlertType("delete");
      setShowAlert(true);
    } catch (error) {
      console.error("Error deleting customer:", error);
      setAlertMessage("Failed to delete customer or purchases");
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
          onConfirmDelete={() => deleteCustomerAndPurchases(idForDeleting)}
        />
      )}

      <h1>Update/Delete Customer</h1>

      <button className="btn-save" onClick={() => setIsExist(!isExist)}>
        Update {customerName}
      </button>
      <br />
      <br />

      {isExist && (
        <div className="customer-form">
          <label>First Name</label>
          <input
            type="text"
            value={newData.FirstName || customerFromStore?.FirstName}
            onChange={(e) => handleChange(e, "FirstName")}
          />
          <br />

          <label>Last Name</label>
          <input
            type="text"
            value={newData.LastName || customerFromStore?.LastName}
            onChange={(e) => handleChange(e, "LastName")}
          />
          <br />

          <label>City</label>
          <input
            type="text"
            value={newData.City || customerFromStore?.City}
            onChange={(e) => handleChange(e, "City")}
          />
          <br />

          <button className="btn-save" onClick={update}>
            Update Customer
          </button>
        </div>
      )}

      <button className="btn-delete" onClick={deleteButton}>
        Delete {customerName}
      </button>
    </div>
  );
}

// ✅ שינוי שם הייצוא בהתאם לשם החדש של הקומפוננטה
export default UpdateDeleteCustomer;

