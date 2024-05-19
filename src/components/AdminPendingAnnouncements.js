import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminPendingAnnouncements.css';

function AdminPendingAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = () => {
    axios.get('http://localhost:3000/api/announcements')
      .then(response => {
        setAnnouncements(response.data);
      })
      .catch(error => {
        console.error('Error fetching announcements:', error);
      });
  };

  const handleApprove = (id) => {
    axios.put(`http://localhost:3000/updateAnnounceStatus`, { id: id })
      .then(() => {
        fetchAnnouncements(); // Onaylama işleminden sonra duyuruları tekrar çek
      })
      .catch(error => {
        console.error('Error approving announcement:', error);
      });
  };

  const handleDecline = (id) => {
    axios.delete(`http://localhost:3000/api/announcements/${id}`)
      .then(() => {
        fetchAnnouncements(); // Silme işleminden sonra duyuruları tekrar çek
      })
      .catch(error => {
        console.error('Error declining announcement:', error);
      });
  };

  return (
    <div className="announcements-container">
      <h1>Pending Announcements</h1>
      <div className="announcements-list">
        {announcements.length > 0 ? (
          announcements.map(announcement => (
            <div key={announcement.id} className="announcement-item">
              <h2>{announcement.title}</h2>
              <p>{announcement.content}</p>
              <p><small>{new Date(announcement.date).toLocaleString()}</small></p>
              <button className="approve-button" onClick={() => handleApprove(announcement.id)}>Approve</button>
              <button className="decline-button" onClick={() => handleDecline(announcement.id)}>Decline</button>
            </div>
          ))
        ) : (
          <p>No pending announcements found.</p>
        )}
      </div>
    </div>
  );
}

export default AdminPendingAnnouncements;
