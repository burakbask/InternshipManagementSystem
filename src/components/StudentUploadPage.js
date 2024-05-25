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

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = () => {
    axios.get('http://localhost:3000/api/student/viewDocuments')
      .then(response => {
        console.log('Fetched documents:', response.data);
        setDocuments(response.data);
      })
      .catch(error => {
        console.error('Error fetching documents:', error);
      });
  };

  const handleDeleteDocument = (id) => {
    axios.delete(`http://localhost:3000/api/student/delete/${id}`)
      .then(() => {
        fetchDocuments();
      })
      .catch(error => {
        console.error('Error deleting document:', error);
      });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Sadece ilk dosyayı al
    const formData = new FormData();
    formData.append('file', file); // Tek dosya ekle
    formData.append('companyMail', companyMail); // Append company email to form data
  
    // Retrieve the token from storage
    const authToken = localStorage.getItem('authToken'); // Replace 'authToken' with your actual token key
  
    axios.post('http://localhost:3000/api/student/uploadSpaf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${authToken}` // Include the token in the Authorization header
      },
    })
    .then(response => {
      console.log(`File upload success:`, response.data);
      alert('File upload success!'); // Başarılı yükleme uyarısı
      fetchDocuments();
    })
    .catch(error => {
      console.error(`File upload error:`, error);
      alert('File upload failed!'); // Hata durumunda uyarı
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
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
            ))
          ) : (
            <p>There are no documents.</p>
          )}
        </div>
        <label htmlFor="company-mail" className="company-mail-label">Company Email</label>
        <input 
          type="email" 
          id="company-mail" 
          value={companyMail} 
          onChange={(e) => setCompanyMail(e.target.value)} 
          className="company-mail-input" 
          placeholder="Enter company email"
        />
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
