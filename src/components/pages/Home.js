
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="home">
      <h1 className="home-title">Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="product-grid">
          {products.map(p => (
            <div key={p._id} className="product-card">
              <img src={p.image} alt={p.name} className="product-image" />
              <h2 className="product-name">{p.name}</h2>
              <p className="product-price">₹{p.price}</p>
              <Link to={`/product/${p._id}`} className="product-link">View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;