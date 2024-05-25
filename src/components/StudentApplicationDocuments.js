import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/iyte_logo-tur.png';
import '../styles/StudentApplicationDocuments.css';

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
        setDocuments(Array.isArray(response.data.companySpafs) ? response.data.companySpafs : []);
      })
      .catch(error => {
        console.error('Error fetching documents:', error);
        setDocuments([]);
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

  const handleDeleteDocument = (id) => {
    axios.delete(`http://localhost:3000/api/student/delete/${id}`)
      .then(() => {
        const updatedDocuments = documents.filter(doc => doc.id !== id);
        setDocuments(updatedDocuments);
      })
      .catch(error => {
        console.error('Error deleting document:', error);
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
