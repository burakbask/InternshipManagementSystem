import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/SignUpPage.css';
import logo from '../assets/iyte_logo-tur.png';

function SignUpPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.Please try again.');
      setIsError(true);
      return; // Şifreler eşleşmiyorsa fonksiyonu sonlandır
    }

    try {
      const response = await axios.post('http://localhost:3000/api/company/register', { email, password });
      if (response.status === 200) {
        setMessage('Signup successful. Redirecting to login...');
        setIsError(false);
        setTimeout(() => navigate('/'), 2000); // Başarılı kayıt sonrası ana giriş sayfasına yönlendir
      } else {
        setMessage('Signup failed. Please try again.');
        setIsError(true);
      }
    } catch (error) {
      setMessage('Signup failed. Please check your details and try again.');
      setIsError(true);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <img src={logo} className='logo' alt="Logo" />
        <p className='ims-header'>INTERNSHIP MANAGEMENT SYSTEM</p>
        <Link to="/" className="signup-button">Login</Link>
      </nav>
      <div className="login-form-container">
        <form onSubmit={handleSubmit}>
        <h2 className="form-title">SIGN UP</h2> {/* Login başlığı eklendi */}
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
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              placeholder="Enter your password again" 
              required 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
            />
          </div>
          <button className="signup-but"type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
