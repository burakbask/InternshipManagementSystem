import React from 'react';
import '../styles/StudentUploadPage.css';
import axios from 'axios';
import logo from '../assets/iyte_logo-tur.png';
import { Link } from 'react-router-dom';

function StudentUploadPage() {
  return (
    <div>
    <nav className="navbar">
        <img src={logo} className='logo' alt="Logo" />
        <p className='ims-header'>INTERNSHIP MANAGEMENT SYSTEM</p>
        <Link to="/" className="logout-button">Log Out</Link>
      </nav>
    <div className="App">
      <header className="App-header">
        <h2>Student Upload Page!</h2>
      </header>
    </div>
    </div>
  );
}

export default StudentUploadPage;
