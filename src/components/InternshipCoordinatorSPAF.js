import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../assets/iyte_logo-tur.png';
import { Link } from 'react-router-dom';

function InternshipCoordinatorSPAF() {
  const [spafs, setSpafs] = useState([]);
  const [feedbacks, setFeedbacks] = useState({}); // State to store feedbacks

  useEffect(() => {
    fetchSpafs();
  }, []);

  const fetchSpafs = () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:3000/api/commission/viewSpafs', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      const filteredSpafs = response.data.filter(spaf => spaf.status !== true);
      setSpafs(filteredSpafs);
    })
    .catch(error => {
      console.error('Error fetching SPAFs:', error);
    });
  };

  const handleApprove = (id) => {
    const token = localStorage.getItem('token');
    axios.post(`http://localhost:3000/api/commission/approve-application`, { companySpafId: id }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      setSpafs(prevSpafs => prevSpafs.filter(spaf => spaf.id !== id));
    })
    .catch(error => {
      console.error('Error approving SPAF:', error);
    });
  };

  const handleDecline = (id) => {
    const token = localStorage.getItem('token');
    const feedback = feedbacks[id];
    axios.post(`http://localhost:3000/api/commission/reject-application/${id}`, { feedback:feedback }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      setSpafs(prevSpafs => prevSpafs.filter(spaf => spaf.id !== id));
    })
    .catch(error => {
      console.error('Error declining SPAF:', error);
    });
  };

  const updateFeedback = (id, value) => {
    setFeedbacks(prevFeedbacks => ({ ...prevFeedbacks, [id]: value }));
  };

  return (
    <div>
      <nav className="navbar">
        <img src={logo} className='logo' alt="Logo" />
        <p className='ims-header'>INTERNSHIP MANAGEMENT SYSTEM</p>
        <Link to="/" className="logout-button">Log Out</Link>
      </nav>
      <div className="spafs-container">
        <h1>Pending SPAFs</h1>
        <div className="spafs-list">
          {spafs.length > 0 ? (
            spafs.map(spaf => (
              <div key={spaf.id} className="spaf-item">
                <h2>SPAF: {spaf.fileName}</h2>
                <a className="document-link" href={`http://localhost:3000/api/commission/download/${spaf.fileName}`} download={spaf.fileName}>{spaf.fileName}</a>
                <p>You can view SPAF details.</p>
                <p><small>{new Date(spaf.date).toLocaleString()}</small></p>
                <input
                  type="text"
                  placeholder="Enter feedback"
                  value={feedbacks[spaf.id] || ''}
                  onChange={e => updateFeedback(spaf.id, e.target.value)}
                  className="feedback-input"
                />
                <div className="buttons-container">
                  <button className="approve-button" onClick={() => handleApprove(spaf.id)}>Approve</button>
                  <button className="decline-button" onClick={() => handleDecline(spaf.id)}>Decline</button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-spafs">
              <p>No pending SPAFs found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InternshipCoordinatorSPAF;
