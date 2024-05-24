import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/iyte_logo-tur.png';
import '../styles/StudentApplicationDocuments.css'; // Ensure this CSS path is correct

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

  const handleDeleteDocument = (id) => {
    axios.delete(`http://localhost:3000/api/student/delete/${id}`)
      .then(() => {
        // Remove the deleted document from the state
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
          {documents.length > 0 ? (
            documents.map(doc => (
              <div key={doc.id} className="document-item">
                <a className="document-link" href={`http://localhost:3000/api/student/download/${doc.fileName}`} download={doc.fileName}>
                  {doc.fileName}
                </a>
                <button className="delete-button" onClick={() => handleDeleteDocument(doc.id)}>
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No documents found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentApplicationDocuments;
