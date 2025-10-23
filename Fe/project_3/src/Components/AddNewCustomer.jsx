


// import Alert from "./Alert";
// import { useNavigate } from "react-router-dom";
// import { addCustomers } from "../Service/CustomersService";
// import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { setCustomers } from "./StoreInformation";

// function NewCustomer() {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const [newcustomer, setNewcustomer] = useState({ FirstName: "", LastName: "", City: "" });
//     const [showAlert, setShowAlert] = useState(false);
//     const [alertMessage, setAlertMessage] = useState("");
//     const [alertType, setAlertType] = useState("success");

//     useEffect(() => {
//         if (showAlert) {
//             const timer = setTimeout(() => {
//                 setShowAlert(false);
//             }, 1500);
//             return () => clearTimeout(timer);
//         }
//     }, [showAlert]);

//     const add = async () => {
//         if (newcustomer.FirstName && newcustomer.LastName && newcustomer.City) {
//             try {
//                 const response = await addCustomers(newcustomer);
//                 await setCustomers(dispatch);

//                 setAlertMessage("The customer was successfully added!");
//                 setAlertType("success");
//                 setShowAlert(true);

//                 setTimeout(() => {
//                     navigate(-1);
//                 }, 1500);
//             } catch (error) {
//                 console.error("Error adding customer:", error);
//                 setAlertMessage("Failed to add customer. Please try again.");
//                 setAlertType("error");
//                 setShowAlert(true);
//             }
//         } else {
//             setAlertMessage("Please fill in all fields.");
//             setAlertType("error");
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
//                 />
//             )}
//             <h1>Add a new customer</h1>
//             <p>
//                 First Name:
//                 <input
//                     type="text"
//                     placeholder="Enter customer first name"
//                     onChange={(e) => setNewcustomer({ ...newcustomer, FirstName: e.target.value })}
//                 />
//             </p>
//             <p>
//                 Last Name:
//                 <input
//                     type="text"
//                     placeholder="Enter customer last name"
//                     onChange={(e) => setNewcustomer({ ...newcustomer, LastName: e.target.value })}
//                 />
//             </p>
//             <p>
//                 City:
//                 <input
//                     type="text"
//                     placeholder="Enter customer city"
//                     onChange={(e) => setNewcustomer({ ...newcustomer, City: e.target.value })}
//                 />
//             </p>
//             <br /><br />
//             <button className="btn-save" onClick={add}>Add customer</button>
//         </div>
//     );
// }

// export default NewCustomer;



import Alert from "./Alert";
import { useNavigate } from "react-router-dom";
import { addCustomers } from "../Service/CustomersService";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCustomers } from "./StoreInformation";

function NewCustomer() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [newCustomer, setNewCustomer] = useState({ FirstName: "", LastName: "", City: "" }); // 🟢 שינוי שם משתנה newcustomer -> newCustomer
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("success");

    useEffect(() => {
        let timer; // 🟢 הוספת משתנה טיימר לשמירה בניקוי
        if (showAlert) {
            timer = setTimeout(() => {
                setShowAlert(false);
            }, 1500);
        }
        return () => clearTimeout(timer); // 🟢 ניקוי נכון של הטיימר
    }, [showAlert]);

    const add = async () => {
        // 🟢 שמירה על קונסיסטנטיות בשמות - newCustomer
        if (newCustomer.FirstName && newCustomer.LastName && newCustomer.City) { // 🟢 שינוי שם משתנה newcustomer -> newCustomer
            try {
                const response = await addCustomers(newCustomer); // 🟢 שינוי שם משתנה
                await setCustomers(dispatch);

                setAlertMessage("The customer was successfully added!");
                setAlertType("success");
                setShowAlert(true);

                setTimeout(() => {
                    navigate(-1);
                }, 1500);
            } catch (error) {
                console.error("Error adding customer:", error);
                setAlertMessage("Failed to add customer. Please try again.");
                setAlertType("error");
                setShowAlert(true);
            }
        } else {
            setAlertMessage("Please fill in all fields.");
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
            <h1>Add a new customer</h1>
            <p>
                First Name:
                <input
                    type="text"
                    placeholder="Enter customer first name"
                    value={newCustomer.FirstName} // 🟢 הוספת value לקלט לתמיכה ב־controlled input
                    onChange={(e) => setNewCustomer({ ...newCustomer, FirstName: e.target.value })} // 🟢 שינוי שם משתנה
                />
            </p>
            <p>
                Last Name:
                <input
                    type="text"
                    placeholder="Enter customer last name"
                    value={newCustomer.LastName} // 🟢 הוספת value
                    onChange={(e) => setNewCustomer({ ...newCustomer, LastName: e.target.value })} // 🟢 שינוי שם משתנה
                />
            </p>
            <p>
                City:
                <input
                    type="text"
                    placeholder="Enter customer city"
                    value={newCustomer.City} // 🟢 הוספת value
                    onChange={(e) => setNewCustomer({ ...newCustomer, City: e.target.value })} // 🟢 שינוי שם משתנה
                />
            </p>
            <br /><br />
            <button className="btn-save" onClick={add}>Add customer</button>
        </div>
    );
}

export default NewCustomer;

