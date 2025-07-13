import React from "react";
import { useNavigate } from "react-router-dom";
import "../../style/adminPage.css";

const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-page">
      <h1>Welcome Admin</h1>
      <button onClick={() => navigate("/admin/categories")}>
        Manage Category
      </button>
      <button onClick={() => navigate("/admin/products")}>
        Manage Product
      </button>
      <button onClick={() => navigate("/admin/orders")}>Manage Orders</button>
    </div>
  );
};

export default AdminPage;
