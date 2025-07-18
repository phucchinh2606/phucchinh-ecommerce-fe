import React, { useEffect, useState } from "react";
import ApiService from "../../service/ApiService";
import { useParams } from "react-router-dom";
import ProductList from "../common/ProductList";
import Pagination from "../common/Pagination";

const CategoryProductPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(null);
  const itemsPerPage = 8;

  const fetchProducts = async () => {
    try {
      const response = await ApiService.getAllProductsByCategoryId(categoryId);
      const allProducts = response.productList || [];
      setTotalPages(Math.ceil(allProducts.length / itemsPerPage));
      setProducts(
        allProducts.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "unable to fetch products by category id"
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryId, currentPage]);

  return (
    <div className="home">
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div>
          <ProductList products={products} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryProductPage;
