
import { useNavigate } from "react-router-dom";
import BoughtProduct from "./BoughtProduct";

function Product(props) {
    const navigate = useNavigate();

    const handleEditClick = () => {
        if (props.prodData) {
            console.log(props.prodData);
            sessionStorage.setItem("product_id", props.prodData._id);
        }
        navigate("/EditProduct");
    };

    return (
        <div className="card-container">
            <h3>Product:</h3>
            <p>
                Name:{" "}
                <span className="link" onClick={handleEditClick}>
                    {props.prodData?.Name} 
                </span>
            </p>
            <p>Price: {props.prodData?.Price} ₪</p>
            <p>Quantity: {props.prodData?.Quantity}</p> 
            <br />
            <BoughtProduct key={props.prodData?._id} prodData={props.prodData} /> 
        </div>
    );
}

export default Product;
