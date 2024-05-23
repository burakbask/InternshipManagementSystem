import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/CompanyAnnouncements.css'; // Update the CSS file path as needed
import logo from '../assets/iyte_logo-tur.png'; // Update logo path as required
import { Link } from 'react-router-dom';

function CompanyAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = () => {
    axios.get('http://localhost:3000/api/company/upload')
      .then(response => {
        const filteredAnnouncements = response.data.filter(announcement => announcement.status === true);
        setAnnouncements(filteredAnnouncements);
      })
      .catch(error => {
        console.error('Error fetching announcements:', error);
      });
  };

  return (
    <div>
      <nav className="navbar">
        <img src={logo} className='logo' alt="Logo" />
        <p className='company-header'>INTERNSHIP MANAGEMENT SYSTEM</p>
        <Link to="/" className="logout-button">Log Out</Link>
      </nav>
      <div className="announcements-container">
        <h1>Company Announcements</h1>
        <div className="announcements-company-list">
          {announcements.length > 0 ? (
            announcements.map(announcement => (
              <div key={announcement.id} className="announcement-item">
                <h2>Announcement Id: {announcement.id}</h2>
                <p>You can view announcement.</p>
                <p><small>{new Date(announcement.date).toLocaleString()}</small></p>
              </div>
            ))
          ) : (
            <div className="no-announcements">
              <p>No announcements found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyAnnouncements;
