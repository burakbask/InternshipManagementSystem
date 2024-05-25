import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/InternshipCoordinatorSPAF.css'; // Ensure this CSS file exists and styles the components appropriately
import logo from '../assets/iyte_logo-tur.png';
import { Link } from 'react-router-dom';
import spafImage from '../assets/spafimage.webp'; // Ensure this image is relevant to SPAFs and exists

function InternshipCoordinatorSPAF() {
  const [spafs, setSpafs] = useState([]);

  useEffect(() => {
    fetchSpafs();
  }, []);

  const fetchSpafs = () => {
    axios.get('http://localhost:3000/api/coordinator/viewSpafs')
      .then(response => {
        setSpafs(response.data);
      })
      .catch(error => {
        console.error('Error fetching SPAFs:', error);
      });
  };

  const handleApprove = (id) => {
    axios.put(`http://localhost:3000/api/coordinator/updateSpafStatus`, { id: id })
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
    axios.delete(`http://localhost:3000/api/coordinator/deleteSpaf/${id}`)
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
                <img src={spafImage} alt="SPAF" className="spaf-image"/>
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
