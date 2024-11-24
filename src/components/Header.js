import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username'); 

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/'); 
  };

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate('/')}>
        <img src="https://img.freepik.com/premium-photo/high-quality-digital-art-background-wallpaper_783884-207655.jpg" alt="Company Logo" /> {/* Replace with your logo */}
      </div>
      {username && (
        <div className="user-info">
          <span>Welcome, {username}!</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </header>
  );
};

export default Header;
