


// import Alert from "./Alert"
// import { useNavigate } from "react-router-dom"
// import { addProduct } from "../Service/ProductsService"
// import { useState, useEffect } from "react"
// import { useDispatch } from "react-redux"
// import { setAllProducts } from "./StoreInformation"

// function NewProdact() {
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const [ProductValue, setProductValue] = useState({ Name: "", Price: "", Quantity: "" })
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
//         if (ProductValue.Name.length > 0 && ProductValue.Price.length > 0 && ProductValue.Quantity.length > 0) {
//             try {
//                 await addProduct(ProductValue);
//                 await setAllProducts(dispatch);

//                 setAlertMessage("The product was successfully added!");
//                 setAlertType("success");
//                 setShowAlert(true);

//                 setTimeout(() => {
//                     navigate(-1);
//                 }, 1500);
//             } catch (error) {
//                 console.error("Error adding product:", error);
//                 setAlertMessage("Failed to add product. Please try again.");
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
//             <h1>Add a new product</h1>
//             <p>
//                 Name:
//                 <input
//                     type="text"
//                     placeholder={"Enter product name"}
//                     onChange={(e) => setProductValue({ ...ProductValue, Name: e.target.value })}
//                 />
//             </p>
//             <p>
//                 Price:
//                 <input
//                     type="number"
//                     placeholder={"Enter product price"}
//                     onChange={(e) => setProductValue({ ...ProductValue, Price: e.target.value })}
//                 />
//             </p>
//             <p>
//                 Quantity:
//                 <input
//                     type="number"
//                     placeholder={"Enter product quantity"}
//                     onChange={(e) => setProductValue({ ...ProductValue, Quantity: e.target.value })}
//                 />
//             </p>
//             <br /><br />
//             <button onClick={add}>Add the product</button>
//         </div>
//     );
// }

// export default NewProdact;



import Alert from "./Alert"; // שדרוג: הוספתי ; לסיום השורה לפי קונבנציות JS.
import { useNavigate } from "react-router-dom";
import { addProduct } from "../Service/ProductsService";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllProducts } from "./StoreInformation";

function NewProduct() { // שדרוג: תיקון שם הקומפוננטה מ-NewProdact ל-NewProduct.
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [productValue, setProductValue] = useState({ Name: "", Price: "", Quantity: "" }); // שדרוג: אות קטנה productValue לפי קונבנציית camelCase.
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("success");

    useEffect(() => {
        let timer; // שדרוג: יצירת משתנה timer מחוץ ל-if כדי להבטיח ניקוי נכון.
        if (showAlert) {
            timer = setTimeout(() => {
                setShowAlert(false);
            }, 1500);
        }
        return () => clearTimeout(timer); // שדרוג: שימוש בניקוי תמידי גם אם לא הופעל.
    }, [showAlert]);

    const add = async () => {
        if (productValue.Name && productValue.Price && productValue.Quantity) { // שדרוג: שימוש בביטוי truthy במקום length > 0.
            try {
                await addProduct(productValue); // שדרוג: productValue במקום ProductValue.
                await setAllProducts(dispatch); // שדרוג: הוספת await לוודא עדכון לפני מעבר.

                setAlertMessage("The product was successfully added!");
                setAlertType("success");
                setShowAlert(true);

                setTimeout(() => {
                    navigate(-1);
                }, 1500);
            } catch (error) {
                console.error("Error adding product:", error);
                setAlertMessage("Failed to add product. Please try again.");
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
            <h1>Add a new product</h1>
            <p>
                Name:
                <input
                    type="text"
                    placeholder="Enter product name" // שדרוג: הסרתי {} כי מיותר ב-string קבוע.
                    value={productValue.Name} // שדרוג: הוספתי value להפוך ל-controlled input.
                    onChange={(e) => setProductValue({ ...productValue, Name: e.target.value })} // שדרוג: productValue במקום ProductValue.
                />
            </p>
            <p>
                Price:
                <input
                    type="number"
                    placeholder="Enter product price" // שדרוג: הסרתי {}.
                    value={productValue.Price} // שדרוג: הוספתי value.
                    onChange={(e) => setProductValue({ ...productValue, Price: e.target.value })} // שדרוג: productValue במקום ProductValue.
                />
            </p>
            <p>
                Quantity:
                <input
                    type="number"
                    placeholder="Enter product quantity" // שדרוג: הסרתי {}.
                    value={productValue.Quantity} // שדרוג: הוספתי value.
                    onChange={(e) => setProductValue({ ...productValue, Quantity: e.target.value })} // שדרוג: productValue במקום ProductValue.
                />
            </p>
            <br /><br />
            <button onClick={add}>Add the product</button>
        </div>
    );
}

export default NewProduct; // שדרוג: שינוי שם הייצוא בהתאם לשם הקומפוננטה.
