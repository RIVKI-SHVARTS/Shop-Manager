import ChangeProduct from "./ChangeProduct "; 
import BoughtProduct from "./BoughtProduct"; 

function Edit_Product() {
    return (
        <div className="card-container">
            <ChangeProduct />
            <br />
            <BoughtProduct /> 
        </div>
    );
}

export default Edit_Product;
