
// import { useSelector } from "react-redux"
// import { useEffect, useState } from "react"
// import CustomerProduct from "./CustomerProduct"


// function Bought_product(props) {
//     const allPurchases = useSelector((store) => store.purchases);
//     const [CustomersBoughtProduct, setCustomersBoughtProduct] = useState([]);
//     const [productID, setProductID] = useState(null);

//     useEffect(() => {
//         if (props.prodData && props.prodData._id) {
//             setProductID(props.prodData._id);
//         } else {
//             const idFromSession = sessionStorage.getItem("product_id");
//             if (idFromSession) {
//                 setProductID(idFromSession);
//             }
//         }
//     }, [props.prodData]);

//     useEffect(() => {
//         if (!productID || allPurchases.length === 0) return;

//         const customersRelevant = allPurchases.filter(
//             (purchase) => purchase.ProductID === productID
//         );
//         setCustomersBoughtProduct(customersRelevant);
//     }, [allPurchases, productID]);

//     return (
//         <div className="bought-product-container">
//             <h5 className="bought-product-title">Customers that bought the product:</h5>
//             <div className="bought-product-list">
//                 {CustomersBoughtProduct.length > 0 ? (
//                     CustomersBoughtProduct.map((Customer) =>
//                         Customer && Customer._id ? (
//                             <div className="bought-product-item" key={Customer._id}>
//                                 <CustomerProduct CustomerData={Customer} />
//                             </div>
//                         ) : null
//                     )
//                 ) : (
//                     <p className="bought-product-empty">No customers have bought this product yet.</p>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Bought_product;














import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CustomerProduct from "./CustomerProduct";

// שינוי: שם הפונקציה שונה ל-BoughtProduct לפי קונבנציה
function BoughtProduct(props) {
  const allPurchases = useSelector((store) => store.purchases);
  const [customersBoughtProduct, setCustomersBoughtProduct] = useState([]); // שינוי: שם סטייט לאות קטנה לפי קונבנציה
  const [productID, setProductID] = useState(null);

  useEffect(() => {
    if (props.prodData?._id) { // שינוי: Optional Chaining במקום תנאי ארוך
      setProductID(props.prodData._id);
    } else {
      const idFromSession = sessionStorage.getItem("product_id");
      if (idFromSession) {
        setProductID(idFromSession);
      } else {
        setProductID(null); // שינוי: הוספת איפוס אם אין מזהה בכלל
      }
    }
  }, [props.prodData]);

  useEffect(() => {
    if (!productID || allPurchases.length === 0) return;

    const relevantCustomers = allPurchases.filter( // שינוי: שם משתנה לקריא יותר
      (purchase) => purchase.ProductID === productID
    );
    setCustomersBoughtProduct(relevantCustomers); // שינוי: שם סטייט מותאם לשינוי למעלה
  }, [allPurchases, productID]);

  return (
    <div className="bought-product-container">
      <h5 className="bought-product-title">Customers that bought the product:</h5>
      <div className="bought-product-list">
        {customersBoughtProduct.length > 0 ? ( // שינוי: שם סטייט מותאם לשינוי למעלה
          customersBoughtProduct.map((customer) => // שינוי: שם משתנה לקריא יותר
            customer && customer._id ? (
              <div className="bought-product-item" key={customer._id}>
                <CustomerProduct CustomerData={customer} />
              </div>
            ) : null
          )
        ) : (
          <p className="bought-product-empty">
            No customers have bought this product yet.
          </p>
        )}
      </div>
    </div>
  );
}

// שינוי: שם הייצוא מותאם לשם הפונקציה
export default BoughtProduct;



