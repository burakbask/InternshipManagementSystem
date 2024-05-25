import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/iyte_logo-tur.png';
import '../styles/CompanyApplicationForm.css';

function CompanyApplicationForm() {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');

  const fetchDocuments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/company/viewStudentSpafs', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setDocuments(response.data.spafs);
      console.log(response.data.spafs);
    } catch (err) {
      setError(err.message);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return; // Check if a file is actually selected

    const formData = new FormData();
    formData.append('file', file);
    formData.append('studentMail', email);

    const token = localStorage.getItem('token');
    axios.post('http://localhost:3000/api/company/uploadCompanySpaf', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      console.log(`File upload success:`, response.data);
      alert("File uploaded successfully'");
      fetchDocuments(); // Refresh the document list
    })
    .catch(error => {
      console.error(`File upload error:`, error);
      setError(error.message);
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <nav className="navbar">
        <img src={logo} className='logo' alt="Logo" />
        <p className='ims-header'>INTERNSHIP MANAGEMENT SYSTEM</p>
        <Link to="/" className="logout-button">Log Out</Link>
      </nav>
      <h1 className="company-application-list">Company Announcements</h1>
      {documents.length > 0 ? (
        documents.map(doc => (
          <div key={doc.id} className="document-item">
            <a className="document-link" href={`http://localhost:3000/api/commission/download/${doc.fileName}`} download={doc.fileName}>
              {doc.fileName}
            </a>
          </div>
        ))
      ) : (
        <p>No documents found.</p>
      )}
      <div className="input-container">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter student's email"
          className="email-input"
        />
        <input
          type="file"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
          id="hidden-file-input"
          accept=".pdf"
        />
        <button className='button25'onClick={() => document.getElementById('hidden-file-input').click()}>
          Upload Document
        </button>
      </div>
    </div>
  );
  
}

export default CompanyApplicationForm;
