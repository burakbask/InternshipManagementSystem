import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminPendingAnnouncements.css';
import logo from '../assets/iyte_logo-tur.png';
import { Link } from 'react-router-dom';

function AdminPendingAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = () => {
    axios.get('http://localhost:3000/api/admin/viewDocuments')
      .then(response => {
        // Filter out announcements where the status is true
        const filteredAnnouncements = response.data.filter(announcement => !announcement.status);
        setAnnouncements(filteredAnnouncements);
      })
      .catch(error => {
        console.error('Error fetching announcements:', error);
      });
};

  const handleApprove = (id) => {
    axios.put(`http://localhost:3000/api/admin/updateAnnounceStatus`, { id: id })
      .then(() => {
        setAnnouncements(prevAnnouncements => 
          prevAnnouncements.filter(announcement => announcement.id !== id)
        );
      })
      .catch(error => {
        console.error('Error approving announcement:', error);
      });
  };

  const handleDecline = (id) => {
    axios.delete(`http://localhost:3000/api/admin/delete/${id}`)
      .then(() => {
        setAnnouncements(prevAnnouncements => 
          prevAnnouncements.filter(announcement => announcement.id !== id)
        );
      })
      .catch(error => {
        console.error('Error declining announcement:', error);
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
        <h1>Pending Announcements</h1>
        <div className="addocument-list">
        {announcements.length > 0 ? (
            announcements.map(announcement => (
              <div key={announcement.id} className="addocument-item">
                <a className="document-link" href={`http://localhost:3000/api/commission/download/${announcement.fileName}`} download={announcement.fileName}>
                  {announcement.fileName}
                </a>
                <div className="buttons-container">
                  <button className="approve-button" onClick={() => handleApprove(announcement.id)}>Approve</button>
                  <button className="decline-button" onClick={() => handleDecline(announcement.id)}>Decline</button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-announcements">
              <p>No pending announcements found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPendingAnnouncements;