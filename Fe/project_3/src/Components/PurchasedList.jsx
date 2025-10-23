// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";


// function PurchasedList() {
//     const rawData = sessionStorage.getItem("CustomerData");
//     const CustomerData = rawData ? JSON.parse(rawData) : null;

//     const Purchases = useSelector((store) => store.purchases);
//     const navigate = useNavigate();

//     const [ProductBought, setProductBought] = useState([]);

//     useEffect(() => {
//         if (!CustomerData || !CustomerData.CustomerID) return;

//         const UniqueUserPurchases = Purchases.filter(
//             (purchase) => purchase.CustomerID === CustomerData.CustomerID
//         );

//         const uniqueProducts = UniqueUserPurchases.filter(
//             (purchase, index, self) =>
//                 index === self.findIndex(
//                     (p) => p.Data.ProductBought === purchase.Data.ProductBought
//                 )
//         );

//         setProductBought(uniqueProducts);
//     }, [Purchases]);

//     const navigateEditProduct = (productID) => {
//         sessionStorage.setItem("product_id", productID);
//         navigate("/EditProduct");
//     };

//     return (
//         <div className="card-container">
//             <h1>Purchased List</h1>
//             <ul>
//                 {ProductBought.map((Product, index) => (
//                     <li
//                         key={index}
//                         className="link"
//                         onClick={() => navigateEditProduct(Product.ProductID)}
//                     >
//                         {Product.Data.ProductBought}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default PurchasedList;


import { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Purchased_list() {

  const rawData = sessionStorage.getItem("CustomerData");
  const CustomerData = rawData ? JSON.parse(rawData) : null;

  const Purchases = useSelector((store) => store.purchases);
  const navigate = useNavigate();

  const [ProductBought, setProductBought] = useState([]);

  useEffect(() => {
    if (!CustomerData || !CustomerData.CustomerID) return;

    // ✅ שדרוג קריאות: שם ברור יותר
    const customerPurchases = Purchases.filter(
      (purchase) => purchase.CustomerID === CustomerData.CustomerID
    );

    // ✅ שדרוג: מציאת מוצרים ייחודיים בקיצור ברור יותר
    const uniqueProducts = customerPurchases.filter(
      (purchase, index, self) =>
        index === self.findIndex(
          (p) => p.Data?.ProductBought === purchase.Data?.ProductBought
        )
    );

    setProductBought(uniqueProducts);
  }, [Purchases, CustomerData]); 
  // ✅ הוספתי CustomerData כתלות — עוזר במקרה של שינויים

  const navigateEditProduct = (productID) => {
    sessionStorage.setItem("product_id", productID);
    navigate("/EditProduct");
  };

  return (
    <div className="card-container">
      <h1>Purchased List</h1>
      <ul>
        {ProductBought.map((Product, index) => (
          <li
            key={Product._id || index} // ✅ עדיף מפתח ייחודי אם קיים _id
            className="link"
            onClick={() => navigateEditProduct(Product.ProductID)}
          >
            {Product.Data?.ProductBought}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Purchased_list;
