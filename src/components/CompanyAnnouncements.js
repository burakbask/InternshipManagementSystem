import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import '../styles/CompanyAnnouncements.css'; // Ensure this path is correct
import { Link } from 'react-router-dom';
import logo from '../assets/iyte_logo-tur.png'; // Ensure your logo path is correct

function CompanyAnnouncements() {
    const [announcements, setAnnouncements] = useState([]);
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = () => {
        axios.get('http://localhost:3000/api/admin/viewApprovedDocuments')
        .then(response => {
            setAnnouncements(response.data);
        })
        .catch(error => {
            console.error('Error fetching announcements:', error);
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

        const formData = new FormData();
        formData.append('file', files[0]); // Handle single file

        axios.post('http://localhost:3000/api/upload', formData)
        .then(response => {
            alert('File uploaded successfully');
            fetchAnnouncements(); // Refresh announcements after upload
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
                {announcements.length > 0 ? (
                    announcements.map(announcement => (
                        <div key={announcement.id} className="announcement-item">
                            <h2>Announcement Id: {announcement.id}</h2>
                            <p><small>{new Date(announcement.date).toLocaleString()}</small></p>
                        </div>
                    ))
                ) : (
                    <div className="no-announcements">No announcements found.</div>
                )}
                <input type="file" id="file-upload" accept=".pdf" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }}/>
                <button className="announcement-button" onClick={handleFileSelectAndUpload}>
                    Announce
                </button>
            </div>
        </div>
    );
}

export default CompanyAnnouncements;
