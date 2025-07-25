// pages/Cart.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/slices/cartSlice';
import './Cart.css';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="cart">
      <h1 className="cart-title">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item._id} className="cart-item">
              <div>
                <h2>{item.name}</h2>
                <p>Qty: {item.qty}</p>
              </div>
              <div className="cart-actions">
                <p>₹{item.price * item.qty}</p>
                <button onClick={() => handleRemove(item._id)}>Remove</button>
              </div>
            </div>
          ))}
          <h2 className="cart-total">Total: ₹{total.toFixed(2)}</h2>
        </div>
      )}
    </div>
  );
};

export default Cart;
