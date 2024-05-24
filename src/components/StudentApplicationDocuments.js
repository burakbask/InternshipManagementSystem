import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/iyte_logo-tur.png';
import '../styles/AdminHome.css'; // Make sure the CSS path is correct

function StudentApplicationDocuments() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = () => {
    axios.get('http://localhost:3000/api/student/viewDocuments')
      .then(response => {
        setDocuments(response.data);
      })
      .catch(error => {
        console.error('Error fetching documents:', error);
      });
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('files', file);
    });

    axios.post('http://localhost:3000/api/student/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      alert('File uploaded successfully');
      fetchDocuments(); // Refresh the list after upload
    })
    .catch(error => {
      console.error('File upload error:', error);
      alert('Error uploading file');
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
                <a className="document-link" href={`http://localhost:3000/api/student/download/${doc.fileName}`} download={doc.fileName}>
                  {doc.fileName}
                </a>
              </div>
            ))
          ) : (
            <p>No documents found.</p>
          )}
        </div>
        <label htmlFor="file-upload" className="file-upload-label">Upload Document</label>
        <input type="file" id="file-upload" accept=".pdf" multiple onChange={handleFileUpload} className="file-upload-input"/>
      </div>
    </div>
  );
}

export default StudentApplicationDocuments;
