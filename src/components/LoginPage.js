import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import logo from '../assets/iyte_logo-tur.png';
import axios from 'axios';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('api_login_endpoint', {
        email,
        password,
      });
  
      if (response.status === 200) {
        setMessage('The login is successful. You are redirected to homepage..');
        setIsError(false);
        setTimeout(() => navigate('/home'), 1000); // 2 saniye sonra yönlendirme
      } else {
        setMessage('Login failed. Please check your details.');
        setIsError(true);
      }
    } catch (error) {
      setMessage('Login failed. Please check your details.');
      setIsError(true);
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
        {message && <div className={isError ? "error-message" : "success-message"}>{message}</div>}
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
