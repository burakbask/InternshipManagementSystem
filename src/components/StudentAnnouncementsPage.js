import React, { useEffect, useState } from 'react';
import '../styles/StudentAnnouncementsPage.css';
import axios from 'axios';
import logo from '../assets/iyte_logo-tur.png';
import { Link } from 'react-router-dom';


function StudentAnnouncementsPage() {
  const [documents, setAnnouncements] = useState([]);

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
      <div className="announcements-container-student">
        <h1>Announcements</h1>
        <div className="announcements-list-student">
        {documents.length > 0 ? (
            documents.map(doc => (
              <div key={doc.id} className="document-item">
                <a className="document-link" href={`https://internshipmanagementsystem.onrender.com/api/commission/download/${doc.fileName}`} download={doc.fileName}>
                  {doc.fileName}
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

export default StudentAnnouncementsPage;
