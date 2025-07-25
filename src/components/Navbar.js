import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/userSlice';

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">🛍️ eShop</Link>
      </div>

      <div className="navbar-center">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/cart" className="navbar-link">Cart ({cartItems.length})</Link>
        {user?.isAdmin && <Link to="/admin" className="navbar-link">Admin</Link>}
      </div>

      <div className="navbar-right">
        {user ? (
          <>
            <span className="navbar-user">👤 {user.name}</span>
            <button className="navbar-link logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


