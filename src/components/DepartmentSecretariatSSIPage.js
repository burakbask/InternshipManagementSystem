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
    axios.get('https://internshipmanagementsystem.onrender.com/api/deptSecretariat/viewSsis')
      .then(response => {
        console.log(response.data);
        // Assuming the actual SSI data is wrapped in a response object under 'ssi'
        // Adjust based on the actual response structure
        const ssiData = response.data.ssis ? response.data.ssis : [];
        setSsis(Array.isArray(ssiData) ? ssiData : [ssiData]); // Ensures ssis is always an array
      })
      .catch(error => {
        console.error('Error fetching SSI documents:', error);
        setSsis([]); // Handle error by setting an empty array
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
            ssis.map(ssi => (
              <div key={ssi.id} className="document-item">
                <p><strong>Student Email:</strong> {ssi.studentMail}</p>
                <a className="document-link" href={`https://internshipmanagementsystem.onrender.com/api/commission/download/${ssi.fileName}`} download={ssi.fileName}>
                  {ssi.fileName}
                </a>
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
