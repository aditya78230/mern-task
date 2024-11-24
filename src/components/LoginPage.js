import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/api';

const LoginPage = () => {
  const [f_userName, setUsername] = useState('');
  const [f_Pwd, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ f_userName, f_Pwd });
      localStorage.setItem('username', f_userName);
      setMessage('Login Successful!');
      setTimeout(() => {
        navigate('/employee-list'); 
      }, 1000);
    } catch (error) {
      setMessage('Invalid login details'); 
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          value={f_userName}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={f_Pwd}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginPage;
