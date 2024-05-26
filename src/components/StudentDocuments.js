import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/StudentDocuments.css'; // Create this CSS file for styling
import logo from '../assets/iyte_logo-tur.png';
import { Link } from 'react-router-dom';

function StudentDocuments() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = () => {
    axios.get('https://internshipmanagementsystem.onrender.com/api/commission/viewDocuments')
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
      <div className="documents-container-student">
        <h1>Internship Documents</h1>
        <div className="documents-list-student">
          {documents.length > 0 ? (
            documents.map(doc => (
              <div key={doc.id} className="document-item">
              <a className="document-link" href={`https://internshipmanagementsystem.onrender.com/api/commission/download/${doc.fileName}`} download={doc.fileName}>
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

export default StudentDocuments;
