import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "../styles/Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      // 1️⃣ Fetch static JSON products
      const jsonRes = await fetch("/data/products.json");
      const jsonData = await jsonRes.json();

      // 2️⃣ Fetch products from API (admin added)
      const apiRes = await fetch("http://localhost:5000/product/get/all");
      const apiData = await apiRes.json();

      // 3️⃣ Merge them
      const allProducts = [
        ...(jsonData || []),
        ...(apiData.products || [])
      ];

      setProducts(allProducts);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      // fallback: only JSON products
      const fallbackRes = await fetch("/data/products.json");
      const fallbackData = await fallbackRes.json();
      setProducts(fallbackData || []);
    }
  };

  const filteredCategory = searchParams.get("category");
  const searchTerm = searchParams.get("search")?.toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchCategory = filteredCategory
      ? product.category.toLowerCase() === filteredCategory.toLowerCase()
      : true;
    const matchSearch = searchTerm
      ? product.name.toLowerCase().includes(searchTerm)
      : true;
    return matchCategory && matchSearch;
  });

  // Pagination logic
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="products-page">
      <h2>Our Product Catalogue</h2>
      <div className="products-grid">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
        ) : (
          <p>No products match your search.</p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
            &lt; Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
            Next &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
