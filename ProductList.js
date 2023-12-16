// src/components/ProductList.js
import React from 'react';

const ProductList = ({ products, onProductStatusChange }) => {
  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - Status: {product.status}
            {product.status === 'pending' && (
              <>
                <button onClick={() => onProductStatusChange(product.id, 'approved')}>
                  Approve
                </button>
                <button onClick={() => onProductStatusChange(product.id, 'rejected')}>
                  Reject
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
