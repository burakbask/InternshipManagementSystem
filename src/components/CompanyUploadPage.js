import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/iyte_logo-tur.png';
import '../styles/CompanyUploadPage.css';

function CompanyUploadPage() {
  const [documents, setDocuments] = useState([]);
  const [email, setEmail] = useState(''); // State to store the email

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = () => {
    axios.get('http://localhost:3000/api/company/viewDocuments')
      .then(response => {
        console.log('Fetched documents:', response.data);
        setDocuments(response.data);
      })
      .catch(error => {
        console.error('Error fetching documents:', error);
      });
  };

  const handleDeleteDocument = (id) => {
    axios.delete(`http://localhost:3000/api/company/delete/${id}`)
      .then(() => {
        fetchDocuments();
      })
      .catch(error => {
        console.error('Error deleting document:', error);
      });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('studentMail', email); // Append the email to the form data

    const token = localStorage.getItem('token');
    axios.post('http://localhost:3000/api/company/uploadCompanySpaf', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      console.log(`File upload success:`, response.data);
      fetchDocuments();
    })
    .catch(error => {
      console.error(`File upload error:`, error);
    });
  };

  return (
    <div>
      <nav className="navbar">
        <img src={logo} className='logo' alt="Logo" />
        <p className='ims-header'>INTERNSHIP MANAGEMENT SYSTEM</p>
        <Link to="/" className="logout-button">Log Out</Link>
      </nav>
      <div className="content">
        <div className="document-list">
          {documents.length > 0 ? (
            documents.map(doc => (
              <div key={doc.id} className="document-item">
                <a className="document-link" href={`http://localhost:3000/api/commission/download/${doc.fileName}`} download={doc.fileName}>
                  {doc.fileName}
                </a>
                <button className="delete-button" onClick={() => handleDeleteDocument(doc.id)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
            ))
          ) : (
            <p>There are no documents.</p>
          )}
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="email-input"
        />
        <label htmlFor="file-upload" className="file-upload-label">Upload Document</label>
        <input type="file" id="file-upload" accept=".pdf" onChange={handleFileUpload} className="file-upload-input"/>
      </div>
    </div>
  );
}

export default CompanyUploadPage;
