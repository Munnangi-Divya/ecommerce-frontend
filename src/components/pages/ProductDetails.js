// pages/ProductDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    axios.get(`https://ecommerce-back-c18i.onrender.com/api/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty }));
  };

  return product ? (
    <div className="product-details">
      <h1 className="product-title">{product.name}</h1>
      <img src={product.image} alt={product.name} className="product-image" />
      <p className="product-price">₹{product.price}</p>
      <input
        type="number"
        value={qty}
        onChange={e => setQty(Number(e.target.value))}
        min="1"
        className="product-qty"
      />
      <button
        onClick={handleAddToCart}
        className="add-to-cart"
      >
        Add to Cart
      </button>
      <p className="product-description">{product.description}</p>
    </div>
  ) : <p className="loading">Loading...</p>;
};

export default ProductDetails;
