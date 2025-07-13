import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./component/context/CartContext";
import Navbar from "./component/common/Navbar.jsx";
import Footer from "./component/common/Footer";
import Home from "./component/pages/Home.jsx";
import ProductDetailsPage from "./component/pages/ProductDetailsPage.jsx";
import CategoryListPage from "./component/pages/CategoryListPage.jsx";
import CategoryProductPage from "./component/pages/CategoryProductPage.jsx";
import CartPage from "./component/pages/CartPage.jsx";
import RegisterPage from "./component/pages/RegisterPage.jsx";
import LoginPage from "./component/pages/LoginPage.jsx";
import ProfilePage from "./component/pages/ProfilePage.jsx";
import AddressPage from "./component/pages/AddressPage.jsx";
import { ProtectedRoute, AdminRoute } from "./service/Guard.js";
import AdminPage from "./component/admin/AdminPage.jsx";
import AdminCategoryPage from "./component/admin/AdminCategoryPage.jsx";
import AddCategory from "./component/admin/AddCategory.jsx";
import EditCategory from "./component/admin/EditCategory.jsx";
import AdminProductPage from "./component/admin/AdminProductPage.jsx";
import AddProductPage from "./component/admin/AddProductPage.jsx";
import EditProductPage from "./component/admin/EditProductPage.jsx";
import AdminOrderPage from "./component/admin/AdminOrderPage.jsx";
import AdminOrderDetailsPage from "./component/admin/AdminOrderDetailsPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
          <Route path="/categories" element={<CategoryListPage />} />
          <Route
            path="/category/:categoryId"
            element={<CategoryProductPage />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<ProfilePage />} />}
          />
          <Route
            path="/add-address"
            element={<ProtectedRoute element={<AddressPage />} />}
          />
          <Route
            path="/edit-address"
            element={<ProtectedRoute element={<AddressPage />} />}
          />
          <Route
            path="/admin"
            element={<AdminRoute element={<AdminPage />} />}
          />
          <Route
            path="/admin/categories"
            element={<AdminRoute element={<AdminCategoryPage />} />}
          />
          <Route
            path="/admin/add-category"
            element={<AdminRoute element={<AddCategory />} />}
          />
          <Route
            path="/admin/edit-category/:categoryId"
            element={<AdminRoute element={<EditCategory />} />}
          />
          <Route
            path="/admin/products"
            element={<AdminRoute element={<AdminProductPage />} />}
          />
          <Route
            path="/admin/add-product"
            element={<AdminRoute element={<AddProductPage />} />}
          />
          <Route
            path="/admin/edit-product/:productId"
            element={<AdminRoute element={<EditProductPage />} />}
          />
          <Route
            path="/admin/orders"
            element={<AdminRoute element={<AdminOrderPage />} />}
          />
          <Route
            path="/admin/order-details/:itemId"
            element={<AdminRoute element={<AdminOrderDetailsPage />} />}
          />
        </Routes>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
