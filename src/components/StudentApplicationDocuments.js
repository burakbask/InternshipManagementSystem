import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/iyte_logo-tur.png';
import '../styles/StudentApplicationDocuments.css'; // Ensure this CSS path is correct

function StudentApplicationDocuments() {
  const [documents, setDocuments] = useState([]);
  const [ssiDocument, setSsiDocument] = useState(null);

  useEffect(() => {
    fetchDocuments();
    fetchSsiDocument();
  }, []);

  const fetchDocuments = () => {
    axios.get('http://localhost:3000/api/student/viewSpafs')
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

  const fetchSsiDocument = () => {
    axios.get('http://localhost:3000/api/student/viewSsi')
      .then(response => {
        console.log(response.data);
        setSsiDocument(response.data.ssi); // Assuming the response contains the document directly
      })
      .catch(error => {
        console.error('Error fetching SSI document:', error);
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
          {documents.map(doc => (
            <div key={doc.id} className="document-item">
              <a className="document-link" href={`http://localhost:3000/api/commission/download/${doc.fileName}`} download={doc.fileName}>
                {doc.fileName}
              </a>
              {/* Conditionally display feedback status if the document status is false */}
              {!doc.status && (
                <p className="feedback-status">Declined. Feedback: {doc.feedback || "No feedback available"}</p>
              )}
            </div>
          ))}
          {ssiDocument && (
            <div className="document-item">
              <a className="document-link" href={`http://localhost:3000/api/commission/download/${ssiDocument.fileName}`} download={ssiDocument.fileName}>
                {ssiDocument.fileName}
              </a>
            </div>
          )}
          {documents.length === 0 && !ssiDocument && <p>No documents found.</p>}
        </div>
      </div>
    </div>
  );
}

export default StudentApplicationDocuments;
