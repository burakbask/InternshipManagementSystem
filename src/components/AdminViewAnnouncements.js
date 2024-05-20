import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminViewAnnouncement.css';
import logo from '../assets/iyte_logo-tur.png';
import { Link } from 'react-router-dom';


function AdminViewAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = () => {
    axios.get('http://localhost:3000/api/admin/viewDocuments')
      .then(response => {
        // status alanı true olan duyuruları filtrele
        console.log(response.data);
        
        setAnnouncements(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching announcements:', error);
      });
  };

  return (
    <div>
    <nav className="navbar">
        <img src={logo} className='logo' alt="Logo" />
        <p className='ims-header'>INTERNSHIP MANAGEMENT SYSTEM</p>
        <Link to="/" className="logout-button">Log Out</Link>
      </nav>
    <div className="announcements-container">
      <h1>Announcements</h1>
      <div className="announcements-list">
        {announcements.length > 0 ? (
          announcements.map(announcement => (
            <div key={announcement.id} className="announcement-item">
              <h2>{announcement.fileName}</h2>
            </div>
          ))
        ) : (
          <p>No announcements found.</p>
        )}
      </div>
    </div>
    </div>
  );
}

export default AdminViewAnnouncements;
