import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/iyte_logo-tur.png';
import '../styles/StudentUploadPage.css';

function StudentUploadPage() {
  const [documents, setDocuments] = useState([]);
  const [companyMail, setCompanyMail] = useState(''); // State for company email
  const [uploadError, setUploadError] = useState(''); // State for upload error messages

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = () => {
    axios.get('https://internshipmanagementsystem.onrender.com/api/student/viewSpafs')
      .then(response => {
        // Ensure the response is an array and filter it if status is false to show feedback
        const filteredDocuments = Array.isArray(response.data.companySpafs) ? response.data.companySpafs : [];
        setDocuments(filteredDocuments);
      })
      .catch(error => {
        console.error('Error fetching documents:', error);
        setDocuments([]); // Handle error by setting an empty array
      });
  };

  const handleDeleteDocument = (id) => {
    axios.delete(`https://internshipmanagementsystem.onrender.com/api/student/delete/${id}`)
      .then(() => {
        fetchDocuments();
      })
      .catch(error => {
        console.error('Error deleting document:', error);
      });
  };

  const handleFileUpload = (event) => {
    if (!companyMail) {
      setUploadError('Please enter a company email before uploading documents.');
      return;
    }

    const file = event.target.files[0];
    if (!file) {
      setUploadError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('companyMail', companyMail);

    const authToken = localStorage.getItem('authToken');

    axios.post('https://internshipmanagementsystem.onrender.com/api/student/uploadSpaf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${authToken}`
      },
    })
    .then(response => {
      console.log(`File upload success:`, response.data);
      alert('File upload success!');
      fetchDocuments();
      setUploadError(''); // Clear any error messages
    })
    .catch(error => {
      console.error(`File upload error:`, error);
      alert('File upload failed!');
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
                <a className="document-link" href={`https://internshipmanagementsystem.onrender.com/api/commission/download/${doc.fileName}`} download={doc.fileName}>
                  {doc.fileName}
                </a>
                
              </div>
            ))
          ) : (
            <p className='p_header'>There are no documents.</p>
          )}
        </div>
        <label htmlFor="company-mail" className="company-mail-label">Company Email</label>
        <input 
          type="email" 
          id="company-mail" 
          value={companyMail} 
          onChange={(e) => { setCompanyMail(e.target.value); setUploadError(''); }} 
          className="company-mail-input" 
          placeholder="Enter company email"
        />
        {uploadError && <p className="upload-error">{uploadError}</p>}
        <label htmlFor="file-upload" className="file-upload-label">Upload Document</label>
        <input 
          type="file" 
          id="file-upload" 
          accept=".pdf" 
          multiple 
          onChange={handleFileUpload} 
          className="file-upload-input"
        />
      </div>
    </div>
  );
}

export default StudentUploadPage;
