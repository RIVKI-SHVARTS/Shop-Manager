
import React from "react"; 


function Alert({ message, type, onClose, onConfirmDelete }) {
  const renderIcon = () => {
    switch (type) {
      case "error":
      case "delete":
        return "⚠️";
      case "success":
        return "✅";
      case "confirmDelete":
        return "🗑️";
      default:
        return "";
    }
  };

  return (
    <div className={`alert alert-${type}`}>
      <span className="alert-icon">{renderIcon()}</span>
      <span>{message}</span>

      {type === "confirmDelete" && (
        <div className="alert-buttons">
          <button className="confirm" onClick={onConfirmDelete}>confirm</button> 
          <button className="cancel" onClick={onClose}>cancel</button>
        </div>
      )}
    </div>
  );
}

export default Alert;





