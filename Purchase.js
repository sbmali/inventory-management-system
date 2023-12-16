// src/components/Purchase.js
import React from 'react';

const Purchase = ({ products, onPurchase }) => {
  return (
    <div>
      <h2>Available Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - Status: {product.status}
            {product.status === 'approved' && (
              <button onClick={() => onPurchase(product.id)}>Purchase</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Purchase;
