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
      const files = event.target.files;
      if (files.length === 0) {
          return; // No file selected
      }
  
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file); // Append the single selected file
  
      // Retrieve the token from storage
      const authToken = localStorage.getItem('authToken'); // Replace 'authToken' with your actual token key
  
      axios.post('http://localhost:3000/api/company/upload', formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${authToken}`  // Include the token in the Authorization header
          }
      })
      .then(response => {
          alert('File uploaded successfully');
          fetchDocuments(); // Refresh documents after upload
      })
      .catch(error => {
          console.error('Error uploading file:', error);
          alert('Error uploading file: ' + error.response.data.message);
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
            documents.map(doc => (
              <div key={doc.id} className="document-item">
                <a className="document-link" href={`http://localhost:3000/api/commission/download/${doc.fileName}`} download={doc.fileName}>
                  {doc.fileName}
                </a>
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
