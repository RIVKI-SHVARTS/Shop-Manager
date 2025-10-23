import { Routes, Route, Link } from "react-router-dom";
import Products from "./Products";
import Customers from "./Customers";
import Purchases from "./Purchases";
import EditProduct from "./EditProduct";
import BuyProduct from "./BuyProduct";
import EditCustomer from "./EditCustomer";
import AddNewProduct from "./AddNewProduct"; 
import AddNewCustomer from "./AddNewCustomer";

function Menu() {
    return (
        <div className="menu-container">
            <nav className="navbar">
                <Link to="/Products">Products</Link>
                <Link to="/Customers">Customers</Link>
                <Link to="/Purchases">Purchases</Link>
            </nav>

            <Routes>
                <Route path="/Products" element={<Products />} />
                <Route path="/Customers" element={<Customers />} />
                <Route path="/Purchases" element={<Purchases />} />
                <Route path="/EditProduct" element={<EditProduct />} />
                <Route path="/BuyProduct" element={<BuyProduct />} />
                <Route path="/EditCustomer" element={<EditCustomer />} />
                <Route path="/AddNewProduct" element={<AddNewProduct />} />
                <Route path="/AddNewCustomer" element={<AddNewCustomer />} />
            </Routes>
        </div>
    );
}

export default Menu;
