import React, { useEffect, useState } from 'react';
import axios from 'axios';

import logo from '../assets/iyte_logo-tur.png';
import { Link } from 'react-router-dom';

function InternshipCoordinatorSPAF() {
  const [spafs, setSpafs] = useState([]);

  useEffect(() => {
    fetchSpafs();
  }, []);

  const fetchSpafs = () => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    axios.get('http://localhost:3000/api/commission/approve-application', {
      headers: {
        Authorization: `Bearer ${token}` // Set the Authorization header
      }
    })
    .then(response => {
      setSpafs(response.data);
    })
    .catch(error => {
      console.error('Error fetching SPAFs:', error);
    });
  };

  const handleApprove = (id) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    axios.put(`http://localhost:3000/api/coordinator/updateSpafStatus`, { id: id }, {
      headers: {
        Authorization: `Bearer ${token}` // Set the Authorization header
      }
    })
    .then(() => {
      setSpafs(prevSpafs => 
        prevSpafs.filter(spaf => spaf.id !== id)
      );
    })
    .catch(error => {
      console.error('Error approving SPAF:', error);
    });
  };

  const handleDecline = (id) => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    axios.delete(`http://localhost:3000/api/coordinator/deleteSpaf/${id}`, {
      headers: {
        Authorization: `Bearer ${token}` // Set the Authorization header
      }
    })
    .then(() => {
      setSpafs(prevSpafs => 
        prevSpafs.filter(spaf => spaf.id !== id)
      );
    })
    .catch(error => {
      console.error('Error declining SPAF:', error);
    });
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
                <h2>SPAF: {spaf.id}</h2>
                
                <p>You can view SPAF details.</p>
                <p><small>{new Date(spaf.date).toLocaleString()}</small></p>
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
