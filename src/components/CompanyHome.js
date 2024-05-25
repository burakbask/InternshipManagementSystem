import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFolder, FaUpload, FaCheckCircle, FaBullhorn } from 'react-icons/fa';
import logo from '../assets/iyte_logo-tur.png';
import '../styles/CompanyHome.css';
import Calendar from 'react-calendar';

function CompanyHome() {
    const navigate = useNavigate();

    const handleDocumentsClick = () => {
        navigate("/CompanyDocuments");
    };

    const handleUploadClick = () => {
        navigate("/CompanyUploadPage");
    };

    const handleVerifyClick = () => {
        navigate("/CompanyApplicationForm");
    };

    const handleAnnounceClick = () => {
        navigate("/CompanyAnnouncements");
    };

    return (
        <div>
            <nav className="navbar">
                <img src={logo} className='logo' alt="Logo" />
                <p className='ims-header'>INTERNSHIP MANAGEMENT SYSTEM</p>
                <div className="logout-button" onClick={() => navigate("/")}>Log Out</div>
            </nav>

            <div className="outside-div">
                <div className="big-div" onClick={handleDocumentsClick}>
                    <FaFolder className="icon" />
                    <div className="icon-text">Documents</div>
                </div>
                {/*
                <div className="big-div" onClick={handleUploadClick}>
                    <FaUpload className="icon" />
                    <div className="icon-text">Upload Document</div>
                </div>
    */}
                <div className="big-div" onClick={handleVerifyClick}>
                    <FaCheckCircle className="icon" />
                    <div className="icon-text">Upload Summer Practice Application Form</div>
                </div>
                <div className="big-div" onClick={handleAnnounceClick}>
                    <FaBullhorn className="icon" />
                    <div className="icon-text">Announce</div>
                </div>
            </div>
            <div className='calendar-container'>
                <Calendar/>
            </div>
        </div>
    );
}

export default CompanyHome;
