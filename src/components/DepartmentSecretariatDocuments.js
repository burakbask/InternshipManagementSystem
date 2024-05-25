import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../assets/iyte_logo-tur.png';
import { Link } from 'react-router-dom';
import '../styles/DepartmentSecretariatDocuments.css';

function DepartmentSecretariatDocuments() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = () => {
    axios.get('http://localhost:3000/api/commission/viewDocuments')
      .then(response => {
        console.log('Fetched documents:', response.data); // Log the fetched data
        setDocuments(response.data);
      })
      .catch(error => {
        console.error('Error fetching documents:', error);
      });
  };

  return (
    <div>
      <nav className="navbar">
        <img src={logo} className='logo' alt="Logo" />
        <p className='ims-header'>INTERNSHIP MANAGEMENT SYSTEM</p>
        <Link to="/" className="logout-button">Log Out</Link>
      </nav>
      <div className="deptsec-container">
        <h1>Internship Documents</h1>
        <div className="deptsec-list">
          {documents.length > 0 ? (
            documents.map(doc => (
              <div key={doc.id} className="document-item">
                <a className="document-link" href={`http://localhost:3000/api/commission/download/${doc.fileName}`} download={doc.fileName}>
                  {doc.fileName}
                </a>
              </div>
            ))
          ) : (
            <div className="no-documents">
              <p>No documents found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DepartmentSecretariatDocuments;
