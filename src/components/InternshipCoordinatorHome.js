import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/iyte_logo-tur.png'; // Logo'nun saklandığı yere göre yolunu ayarlayın
import '../styles/InternshipCoordinatorHome.css';

function InternshipCoordinatorHome() {
  return (
    <div>
      <nav className="navbar">
        <img src={logo} className='logo' alt="Logo" />
        <p className='ims-header'>INTERNSHIP MANAGEMENT SYSTEM</p>
        <Link to="/" className="logout-button">Log Out</Link>
      </nav>
      <div className="content">
        <Link to="/internshipCoordinatorDocumentsPage" className="big-div">
          Upload Documents
        </Link>
        
        <div className="big-div">
          <p>Verify Internship</p>
          {/* İkon gelecek */}
        </div>
      </div>
    </div>
  )
}

export default InternshipCoordinatorHome;
