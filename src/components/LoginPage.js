import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Link bileşenini import edin
import '../styles/LoginPage.css';
import logo from '../assets/iyte_logo-tur.png';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      // API'ye email ve password göndererek giriş yap
      const response = await fetch('api_login_endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Gönderilecek verileri JSON formatında string'e dönüştürür
      });

      // API'den gelen yanıtı JSON formatında alır
      const data = await response.json();

      // Başarılı giriş sonrası sayfa yönlendirmesi
      if (response.ok) {
        // Örnek olarak başarılı girişte '/home' sayfasına yönlendiriyoruz
        window.location.href = '/home';
      } else {
        // Hatalı giriş durumunda
        console.error('Giriş başarısız:', data.error);
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
        {/* Link bileşenini kullanarak Sign Up sayfasına yönlendirme */}
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
