// src/components/ProductTracker.js
import React from 'react';

const ProductTracker = ({ user, purchasedProducts }) => {
  return (
    <div>
      <h2>Product Tracker</h2>
      {user ? (
        <div>
          <p className="text-green-500">Tracking products for {user.username}</p>
          <ul>
            {purchasedProducts.map((product) => (
              <li key={product.id}>
                {product.name} - Status: {product.status}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Please log in to track your products.</p>
      )}
    </div>
  );
};

export default ProductTracker;
