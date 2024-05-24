import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/iyte_logo-tur.png';
import '../styles/InternshipCoordinatorDocumentsPage.css';

function InternshipCoordinatorDocumentsPage() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = () => {
    axios.get('http://localhost:3000/api/commission/viewDocuments')
      .then(response => {
        console.log('Fetched documents:', response.data); // Gelen veriyi kontrol edin
        setDocuments(response.data);
      })
      .catch(error => {
        console.error('Error fetching documents:', error);
      });
  };

  const handleDeleteDocument = (id) => {
    axios.delete(`http://localhost:3000/api/commission/delete/${id}`)
      .then(() => {
        fetchDocuments(); // Silme işlemi başarılı olduktan sonra döküman listesini yeniden çek
      })
      .catch(error => {
        console.error('Error deleting document:', error);
      });
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('files', file); // 'files' backend'de birden fazla dosyayı kabul edecek şekilde ayarlanmalıdır.
    });

    axios.post('http://localhost:3000/api/commission/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      alert('File uploaded successfully');
      console.log(`File upload success:`, response.data);
      fetchDocuments(); // Yükleme başarılı olduktan sonra döküman listesini yeniden çek
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
        <label htmlFor="file-upload" className="file-upload-label">Upload Document</label>
        <input type="file" id="file-upload" accept=".pdf" multiple onChange={handleFileUpload} className="file-upload-input"/>
      </div>
    </div>
  );
}

export default InternshipCoordinatorDocumentsPage;
