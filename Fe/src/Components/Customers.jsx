import CustomersTable from "./CustomersTable";
import { useNavigate } from "react-router-dom";

function Customers() {
    const navigate = useNavigate();

    const navigateToBuyProduct = () => {
        navigate("/BuyProduct");
    };

    const navigateToAddNewCustomer = () => { 
        navigate("/AddNewCustomer");
    };

    return (
        <div className="card-container">
            <h1>Customers</h1>
            <button className="button" onClick={navigateToAddNewCustomer}>Add a new customer</button>
            <CustomersTable /> <br /> <br />
            <button className="button" onClick={navigateToBuyProduct}>Buy Product</button>
        </div>
    );
}

export default Customers;
