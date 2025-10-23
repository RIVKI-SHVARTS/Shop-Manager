

import { useSelector } from "react-redux";
import Product from "./Product";
import TotalPurchases from "./TotalPurchases";

import { useNavigate } from "react-router-dom";

function Products() {
    const navigate = useNavigate();
    const allProducts = useSelector((store) => store.products);

    const navigateToAddNewProdact = () => {
        navigate("/AddNewProduct");
    };

    return (
        <div className="card-container">
            <div className="products-wrapper">
                <TotalPurchases />
                <button onClick={navigateToAddNewProdact}>Add a new product</button>
                <h1>Products</h1><br />
                {
                    allProducts.map((prod) => {
                        return <Product key={prod._id} prodData={prod} />;
                    })
                }
            </div>
        </div>
    );
}

export default Products;

