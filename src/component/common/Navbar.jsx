import React, { useState, useEffect } from "react";
import "../../style/navbar.css";
import { useNavigate, NavLink } from "react-router-dom";
import ApiService from "../../service/ApiService";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    ApiService.isAuthenticated()
  );
  const [isAdmin, setIsAdmin] = useState(ApiService.isAdmin());
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();

    // Lắng nghe thay đổi trong localStorage (từ tab khác)
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    // Lắng nghe custom event (từ cùng tab)
    const handleAuthChange = () => {
      console.log("Navbar - Auth change event received");
      checkAuthStatus();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("authChange", handleAuthChange);

    // Cleanup
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  // Debug: Log state changes
  useEffect(() => {
    console.log("Navbar - State changed:", { isAuthenticated, isAdmin });
  }, [isAuthenticated, isAdmin]);

  const checkAuthStatus = () => {
    const auth = ApiService.isAuthenticated();
    const admin = ApiService.isAdmin();
    console.log("Navbar - Auth status:", { auth, admin });
    setIsAuthenticated(auth);
    setIsAdmin(admin);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    navigate(`/?search=${searchValue}`);
  };

  const handleLogout = () => {
    const confirm = window.confirm("Are you sure you wanna log out? ");
    if (confirm) {
      ApiService.logOut();
      checkAuthStatus(); // Cập nhật state ngay lập tức

      // Trigger custom event để các component khác cập nhật
      window.dispatchEvent(new Event("authChange"));

      navigate("/login");
    }
  };
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/">
          <img src="/images/logo.png" alt="Logo Sammi Shop" />
        </NavLink>
      </div>
      {/* search form */}
      <form className="navbar-search" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Search products"
        />
        <button type="submit">Search</button>
      </form>
      <div className="navbar-link">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/categories">Categories</NavLink>
        {isAuthenticated && <NavLink to="/profile">My Account</NavLink>}
        {isAdmin && <NavLink to="/admin">Admin</NavLink>}
        {!isAuthenticated && <NavLink to="/login">Login</NavLink>}
        {isAuthenticated && (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        )}
        <NavLink to="/cart">Cart</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
