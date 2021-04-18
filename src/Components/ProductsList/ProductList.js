import React from 'react';
import Product from '../Product/Product';
import './ProductList.css'

const ProductList = ({ products, addToCart, currency }) => {
  return (
    <div className="products">
      {
        products.length === 0 ? 'No Product Yet' : (
          products.map((product) => (
            <Product
              product={product}
              key={product.id}
              addToCart={addToCart}
              currency={currency}
            />
          ))
        )
      }
    </div>
  );
};

export default ProductList;
