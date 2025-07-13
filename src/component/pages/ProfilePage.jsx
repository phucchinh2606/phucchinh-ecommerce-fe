import React, { useEffect, useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import Pagination from "../common/Pagination";
import "../../style/profile.css";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState(null);

  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await ApiService.getLoggedInUserInfo();
      setUserInfo(response.user);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Unable to fetch user info"
      );
    }
  };

  if (!userInfo) {
    return <div>loading...</div>;
  }

  const handleAddressClick = () => {
    navigate(userInfo.address ? "/edit-address" : "/add-address");
  };

  const orderItemList = userInfo.orderItemList || [];

  const totalPages = Math.ceil(orderItemList.length / itemsPerPage);

  const paginatedOrders = orderItemList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="profile-page">
      <h2>Welcome {userInfo.name}</h2>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div>
          <p>
            <strong>Name: {userInfo.name}</strong>
          </p>
          <p>
            <strong>Email: {userInfo.email}</strong>
          </p>
          <p>
            <strong>Phone Number: {userInfo.phoneNumber}</strong>
          </p>
          <div>
            <h3>Address</h3>
            {userInfo.address ? (
              <div>
                <p>
                  <strong>Street: {userInfo.address.street}</strong>
                </p>
                <p>
                  <strong>City: {userInfo.address.city}</strong>
                </p>
                <p>
                  <strong>State: {userInfo.address.state}</strong>
                </p>
                <p>
                  <strong>Zip Code: {userInfo.address.zipCode}</strong>
                </p>
                <p>
                  <strong>Country: {userInfo.address.country}</strong>
                </p>
              </div>
            ) : (
              <p>No address information available</p>
            )}
            <button className="profile-button" onClick={handleAddressClick}>
              {userInfo.address ? "Edit address" : "Add address"}
            </button>
          </div>
          <h3>Order history</h3>
          <ul>
            {paginatedOrders.map((order) => (
              <li key={order.id}>
                <img src={order.product?.imageUrl} alt={order.product.name} />
                <div>
                  <p>
                    <strong>Name: {order.product.name}</strong>
                  </p>
                  <p>
                    <strong>Status: {order.status}</strong>
                  </p>
                  <p>
                    <strong>Quantity: {order.quantity}</strong>
                  </p>
                  <p>
                    <strong>Price: {order.price}</strong>
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          ></Pagination>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
