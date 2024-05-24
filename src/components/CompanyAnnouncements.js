import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import '../styles/CompanyAnnouncements.css'; // Ensure this path is correct
import { Link } from 'react-router-dom';
import logo from '../assets/iyte_logo-tur.png'; // Ensure your logo path is correct

function CompanyAnnouncements() {
    const [documents, setDocuments] = useState([]);
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = () => {
        axios.get('http://localhost:3000/api/admin/viewApprovedDocuments')
        .then(response => {
            setDocuments(response.data);
        })
        .catch(error => {
            console.error('Error fetching documents:', error);
        });
    };

    const handleFileSelectAndUpload = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
      const file = event.target.files; // Changed from `event.target.file` to `event.target.files`
      if (file.length === 0) {
          return; // No file selected
      }
  
      const formData = new FormData();
      formData.append('file', file[0]); // Handle single file
  
      axios.post('http://localhost:3000/api/company/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
      })
      .then(response => {
          alert('File uploaded successfully');
          fetchDocuments(); // Refresh documents after upload
      })
      .catch(error => {
          console.error('Error uploading file:', error);
      });
  };

    return (
        <div>
            <nav className="navbar">
                <img src={logo} className='logo' alt="Logo" />
                <p className='company-header'>INTERNSHIP MANAGEMENT SYSTEM</p>
                <Link to="/" className="logout-button">Log Out</Link>
            </nav>
            <div className="announcements-container">
                {documents.length > 0 ? (
                    documents.map(document => (
                        <div key={document.id} className="announcement-item">
                            <h2>Document Id: {document.id}</h2>
                            <p><small>{new Date(document.date).toLocaleString()}</small></p>
                        </div>
                    ))
                ) : (
                    <div className="no-announcements">No documents found.</div>
                )}
                <input type="file" id="file-upload" accept=".pdf" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }}/>
                <button className="announcement-button" onClick={handleFileSelectAndUpload}>
                    Upload Document
                </button>
            </div>
        </div>
    );
}

export default CompanyAnnouncements;
