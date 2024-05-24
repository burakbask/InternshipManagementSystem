import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/DepartmentSecretariatSSIPage.css';
import logo from '../assets/iyte_logo-tur.png';
import { Link } from 'react-router-dom';

function DepartmentSecretariatSSIPage() {
  const [ssis, setSsis] = useState([]);

  useEffect(() => {
    fetchSsis();
  }, []);

  const fetchSsis = () => {
    axios.get('http://localhost:3000/api/secretariat/viewSSI')
      .then(response => {
        setSsis(response.data);
      })
      .catch(error => {
        console.error('Error fetching SSI documents:', error);
      });
  };

  const handleApprove = (id) => {
    axios.put(`http://localhost:3000/api/secretariat/updateSSIStatus`, { id: id })
      .then(() => {
        setSsis(prevSsis => 
          prevSsis.filter(ssi => ssi.id !== id)
        );
      })
      .catch(error => {
        console.error('Error approving SSI document:', error);
      });
  };

  const handleDecline = (id) => {
    axios.delete(`http://localhost:3000/api/secretariat/deleteSSI/${id}`)
      .then(() => {
        setSsis(prevSsis => 
          prevSsis.filter(ssi => ssi.id !== id)
        );
      })
      .catch(error => {
        console.error('Error declining SSI document:', error);
      });
  };

  return (
    <div>
      <nav className="navbar">
        <img src={logo} className='logo' alt="Logo" />
        <p className='ims-header'>SSI MANAGEMENT SYSTEM</p>
        <Link to="/" className="logout-button">Log Out</Link>
      </nav>
      <div className="ssi-container">
        <h1>Pending SSI Documents</h1>
        <div className="ssi-list">
          {ssis.length > 0 ? (
            ssis.map(ssi => (
              <div key={ssi.id} className="ssi-item">
                <h2>SSI Document: {ssi.id}</h2>
                <p>You can view SSI document.</p>
                <p><small>{new Date(ssi.date).toLocaleString()}</small></p>
                <div className="buttons-container">
                  <button className="approve-button" onClick={() => handleApprove(ssi.id)}>Approve</button>
                  <button className="decline-button" onClick={() => handleDecline(ssi.id)}>Decline</button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-ssis">
              <p>No pending SSI documents found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DepartmentSecretariatSSIPage;

