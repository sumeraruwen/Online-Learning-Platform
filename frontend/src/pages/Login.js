import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/login', form);
//       localStorage.setItem('token', res.data.token);
//       alert('Logged in successfully');
//     } catch (err) {
//       alert(err.response?.data?.message || 'Login failed');
//     }
//   };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://online-learning-platform-production.up.railway.app/api/login', form);
      const token = res.data.token;
      const decoded = jwtDecode(token); // decode JWT
  
      // Store important info in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', decoded.role);
      localStorage.setItem('userId', decoded.id);
  
      alert('Logged in successfully');
      window.location.href = '/'; // redirect to course list
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="username" placeholder="Username" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
