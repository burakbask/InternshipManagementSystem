import React from 'react';
import '../styles/LoginPage.css'; // CSS dosyasını import edin
import logo from '../assets/iyte_logo-tur.png'; // Logo dosyasını import edin

function LoginPage() {
  return (
    <div>
      <nav className="navbar">
        <img src={logo} className='logo' alt="Logo" />
        <p className='ims-header'>INTERNSHIP MANAGEMENT SYSTEM</p>
      </nav>
      <div className="login-form-container">
        <form>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
          <br />
          <label htmlFor="password">Şifre:</label>
          <input type="password" id="password" name="password" required />
          <br />
          <button type="submit">Giriş Yap</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
