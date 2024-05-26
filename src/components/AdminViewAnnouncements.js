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
    axios.get('https://internshipmanagementsystem.onrender.com/api/admin/viewApprovedDocuments')
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
        <p className='ims-header'>INTERNSHIP MANAGEMENT SYSTEM</p>
        <Link to="/" className="logout-button">Log Out</Link>
      </nav>
      <div className="admw-container">
        <h1>Approved Announcements</h1>
        <div className="admw-list">
        {announcements.length > 0 ? (
            announcements.map(announcement => (
              <div key={announcement.id} className="admwdocument-item">
                <a className="document-link" href={`https://internshipmanagementsystem.onrender.com/api/commission/download/${announcement.fileName}`} download={announcement.fileName}>
                  {announcement.fileName}
                </a>
                
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

export default AdminViewAnnouncements;
