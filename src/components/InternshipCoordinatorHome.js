import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/iyte_logo-tur.png'; // Adjust the path to where your logo is stored
import '../styles/InternshipCoordinatorHome.css'
function InternshipCoordinatorHome() {
  return (
    <div>
      <nav className="navbar">
        <img src={logo} className='logo' alt="Logo" />
        <p className='ims-header'>INTERNSHIP MANAGEMENT SYSTEM</p>
        <Link to="/" className="logout-button">Log Out</Link>
      </nav>
      <div>
        InternshipCoordinatorHome Content Here
      </div>
    </div>
  )
}

export default InternshipCoordinatorHome;
