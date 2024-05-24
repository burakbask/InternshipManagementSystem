import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/InternshipCoordinatorAnnouncements.css';
import logo from '../assets/iyte_logo-tur.png';
import { Link } from 'react-router-dom';
import logo2 from '../assets/internshipimage.webp'; // Update the path to the new image file

function InternshipCoordinatorAnnouncements() {
  const [documents, setAnnouncements] = useState([]);

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
        <img src={logo2} alt="Document" className="document-image" />
        <div className="announcements-list">
        {documents.length > 0 ? (
            documents.map(doc => (
              <div key={doc.id} className="document-item">
              <img src={logo2} className="document-image" />
              <a className="document-link" href={`http://localhost:3000/api/commission/download/${doc.fileName}`} download={doc.fileName}>
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

export default InternshipCoordinatorAnnouncements;
