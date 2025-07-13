import React, { useEffect, useState } from "react";
import "../../style/adminOrderDetailsPage.css";
import { useParams } from "react-router-dom";
import ApiService from "../../service/ApiService";

const OrderStatus = [
  "PENDING",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "RETURNED",
];

const AdminOrderDetailsPage = () => {
  const { itemId } = useParams();
  const [orderItems, setOrderItems] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedStatus, setSelectedStatus] = useState({});

  useEffect(() => {
    fetchOrderDetails(itemId);
  }, [itemId]);

  const fetchOrderDetails = async (itemId) => {
    try {
      const response = await ApiService.getOrderItemById(itemId);
      setOrderItems(response.orderItemList);
    } catch (error) {
      console.log(error.message || error);
    }
  };

  const handleStatusChange = (orderItemId, newStatus) => {
    setSelectedStatus({ ...selectedStatus, [orderItemId]: newStatus });
  };

  const handleSubmitStatusChange = async (orderItemId) => {
    try {
      await ApiService.updateOrderItemStatus(
        orderItemId,
        selectedStatus[orderItemId]
      );
      setMessage("order item status was successfully updated");
      // Reset selected status for this item
      setSelectedStatus((prev) => {
        const newStatus = { ...prev };
        delete newStatus[orderItemId];
        return newStatus;
      });
      // Refresh the order details after successful update
      await fetchOrderDetails(itemId);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          error.message ||
          "unable to update item status"
      );
    }
  };

  return (
    <div className="order-details-page">
      {message && <div className="message">{message}</div>}
      <h2>Order Details</h2>
      {orderItems.length ? (
        orderItems.map((orderItem) => (
          <div key={orderItem.id} className="order-item-details">
            <div className="info">
              <h3>Order Information</h3>
              <p>
                <strong>Order Item Id:</strong> {orderItem.id}
              </p>
              <p>
                <strong>Quantity:</strong> {orderItem.quantity}
              </p>
              <p>
                <strong>Total Price:</strong> {orderItem.price}
              </p>
              <p>
                <strong>Order Status:</strong> {orderItem.status}
              </p>
              <p>
                <strong>Date Ordered:</strong>{" "}
                {new Date(orderItem.createdAt).toLocaleDateString}
              </p>
            </div>
            <div className="info">
              <h3>User Information</h3>
              <p>
                <strong>Name:</strong> {orderItem.user.name}
              </p>
              <p>
                <strong>Email:</strong> {orderItem.user.email}
              </p>
              <p>
                <strong>Phone Number:</strong> {orderItem.user.phoneNumber}
              </p>
              <p>
                <strong>Role:</strong> {orderItem.user.role}
              </p>
            </div>
            <div className="info">
              <h3>Delivery Address</h3>
              <p>
                <strong>Country:</strong> {orderItem.user.address?.country}
              </p>
              <p>
                <strong>State:</strong> {orderItem.user.address?.state}
              </p>
              <p>
                <strong>City:</strong> {orderItem.user.address?.city}
              </p>
              <p>
                <strong>Street:</strong> {orderItem.user.address?.street}
              </p>
              <p>
                <strong>Zip Code:</strong> {orderItem.user.address?.zipCode}
              </p>
            </div>
            <div className="info">
              <h3>Product Information</h3>
              <img
                src={orderItem.product.imageUrl}
                alt={orderItem.product.name}
              />
              <p>
                <strong>Name:</strong> {orderItem.product.name}
              </p>
              <p>
                <strong>Description:</strong> {orderItem.product.description}
              </p>
              <p>
                <strong>Price:</strong> {orderItem.product.price}
              </p>
            </div>
            <div className="status-change">
              <h4>Change status</h4>
              <select
                className="status-option"
                value={selectedStatus[orderItem.id] || orderItem.status}
                onChange={(e) =>
                  handleStatusChange(orderItem.id, e.target.value)
                }
              >
                {OrderStatus.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <button
                className="update-status-button"
                onClick={() => handleSubmitStatusChange(orderItem.id)}
              >
                Update Status
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>Loading order details...</p>
      )}
    </div>
  );
};

export default AdminOrderDetailsPage;
