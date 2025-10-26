import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Customers_table() {
    const navigate = useNavigate();
    const allCustomers = useSelector((store) => store.customers); 
    const allPurchases = useSelector((store) => store.purchases); 

    const handleEditClick = (productId) => {
        sessionStorage.setItem("product_id", productId);
        navigate("/EditProduct");
    };

    const handleEditCustomerClick = (customer) => {
        sessionStorage.setItem("CustomerData", JSON.stringify(customer));
        navigate("/EditCustomer");
    };

    return (
        <table className="customers-table">
            <thead>
                <tr>
                    <th>Customer Name</th>
                    <th>Bought Products</th> 
                    <th>Date Purchase</th>
                </tr>
            </thead>
            <tbody>
                {allCustomers.map((customer) => {
                    return (
                        <tr key={customer._id}>
                            <td>
                                <span
                                    className="link"
                                    onClick={() => handleEditCustomerClick(customer)}
                                >
                                    {`${customer.FirstName} ${customer.LastName}`}
                                </span>
                            </td>
                            <td>
                                <ul>
                                    {allPurchases
                                        .filter((p) => p.CustomerID === customer._id)
                                        .map((purchase) => (
                                            <li key={purchase._id}>
                                                <span
                                                    className="link"
                                                    onClick={() => handleEditClick(purchase.ProductID)}
                                                >
                                                    {purchase.Data?.ProductBought}
                                                </span>
                                            </li>
                                        ))}
                                </ul>
                            </td>
                            <td>
                                <ul>
                                    {allPurchases
                                        .filter((p) => p.CustomerID === customer._id)
                                        .map((purchase) => (
                                            <li key={purchase._id}>
                                                {purchase.Data?.Date}
                                            </li>
                                        ))}
                                </ul>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default Customers_table;
