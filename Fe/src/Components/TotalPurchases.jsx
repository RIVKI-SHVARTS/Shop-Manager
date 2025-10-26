
import { useSelector } from "react-redux";

function TotalPurchases() {
  const allPurchases = useSelector((store) => store.purchases);

  return (
    <div className="total-purchases-box">
      <h1>Total Purchases</h1>
      <span>{allPurchases ? allPurchases.length : 0}</span>
    </div>
  );
}

export default TotalPurchases;




