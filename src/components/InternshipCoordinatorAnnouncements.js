import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/InternshipCoordinatorAnnouncements.css';
import logo from '../assets/iyte_logo-tur.png';
import { Link } from 'react-router-dom';
import internshipImage from '../assets/internshipimage.webp'; // Update the path to the new image file

function InternshipCoordinatorAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = () => {
    axios.get('http://localhost:3000/api/admin/viewApprovedDocuments')
      .then(response => {
        
        setAnnouncements(response.data);
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
        <h1>Internship Announcements</h1>
        <div className="announcements-list">
          {announcements.length > 0 ? (
            announcements.map(announcement => (
              <div key={announcement.id} className="announcement-item">
                <h2>Internship Oppourtunity:{announcement.id}</h2>
                <img src={internshipImage} alt="Internship" className="announcement-image"/>
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

export default InternshipCoordinatorAnnouncements;
