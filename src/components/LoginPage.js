import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate'i dahil edin
import '../styles/LoginPage.css';
import logo from '../assets/iyte_logo-tur.png';
import axios from 'axios';

function LoginPage() {
  const navigate = useNavigate(); // useNavigate hook'ını kullanarak değişken oluşturun
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('api_login_endpoint', {
        email,
        password,
      });
  
      if (response.status === 200) {
        navigate('/home'); // useHistory yerine useNavigate kullanarak sayfa yönlendirmesi
      } else {
        console.error('Giriş başarısız');
      }
    } catch (error) {
      console.error('Giriş başarısız:', error);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <img src={logo} className='logo' alt="Logo" />
        <p className='ims-header'>INTERNSHIP MANAGEMENT SYSTEM</p>
        <Link to="/signup" className="signup-button">Sign Up</Link>
      </nav>
      <div className="login-form-container">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Enter your email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Enter your password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;