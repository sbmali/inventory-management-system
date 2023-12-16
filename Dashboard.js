// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import Auth from './Auth';
import ProductList from './ProductList';
import Purchase from './Purchase';
import ProductTracker from './ProductTracker';
import axios from 'axios';

const Dashboard = ({ user, setUser }) => {
  const [products, setProducts] = useState([]);
  const [purchasedProducts, setPurchasedProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []); // Run once on component mount

  const handleProductStatusChange = async (productId, newStatus) => {
    // Update the product status based on user actions
    try {
      await axios.put(`http://localhost:5000/api/products/${productId}`, { status: newStatus });
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId ? { ...product, status: newStatus } : product
        )
      );
    } catch (error) {
      console.error('Error updating product status:', error);
    }
  };

  const handlePurchase = async (productId) => {
    // Implement logic for product purchase here
    const purchasedProduct = products.find((product) => product._id === productId);
    if (purchasedProduct) {
      try {
        await axios.post('http://localhost:5000/api/purchases', { productId });
        setPurchasedProducts((prevPurchasedProducts) => [...prevPurchasedProducts, purchasedProduct]);
      } catch (error) {
        console.error('Error making a purchase:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Inventory Management System</h1>
      {user ? (
        <div>
          <p className="text-green-500">Welcome, {user.username}!</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded shadow-md">
              <ProductList products={products} onProductStatusChange={handleProductStatusChange} />
            </div>
            <div className="bg-white p-4 rounded shadow-md">
              <Purchase products={products} onPurchase={handlePurchase} />
            </div>
          </div>
          <div className="mt-8">
            <ProductTracker user={user} purchasedProducts={purchasedProducts} />
          </div>
        </div>
      ) : (
        <Auth setUser={setUser} />
      )}
    </div>
  );
};

export default Dashboard;
