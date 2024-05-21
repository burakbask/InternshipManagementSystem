import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminDocuments.css'; // Create this CSS file for styling
import logo from '../assets/iyte_logo-tur.png';
import { Link } from 'react-router-dom';

function AdminDocuments() {
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
      <div className="documents-container">
        <h1>Internship Documents</h1>
        <div className="documents-list">
          {documents.length > 0 ? (
            documents.map(document => (
              <div key={document.id} className="document-adminitem">
                <h2>Document: {document.id}</h2>
                <p>{document.title}</p>
                <p><small>{new Date(document.date).toLocaleString()}</small></p>
                <a href={document.url} target="_blank" rel="noopener noreferrer" className="view-button">View Document</a>
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

export default AdminDocuments;
