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
        <p className='ims-header'>INTERNSHIP MANAGEMENT SYSTEM</p>
        <Link to="/" className="logout-button">Log Out</Link>
      </nav>
      <div className="ssi-container">
        <h1>Pending SSI Documents</h1>
        <div className="ssi-list">
        {ssis.length > 0 ? (
            ssis.map(doc => (
              <div key={doc.id} className="document-item">
              
              <a className="document-link" href={`http://localhost:3000/api/commission/download/${doc.fileName}`} download={doc.fileName}>
                {doc.fileName}
              </a>
                <div className="buttons-container">
                  <button className="approve-button" onClick={() => handleApprove(doc.id)}>Approve</button>
                  <button className="decline-button" onClick={() => handleDecline(doc.id)}>Decline</button>
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

