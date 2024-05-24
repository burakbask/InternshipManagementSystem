import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFolder, FaUpload, FaBullhorn, FaAlgolia, FaReadme } from 'react-icons/fa';
import logo from '../assets/iyte_logo-tur.png';
import '../styles/StudentHome.css';
import Calendar from 'react-calendar';

function StudentHome() {
    const navigate = useNavigate();

    const handleDocumentsClick = () => {
        navigate("/StudentDocuments");
    };
    const handleDocuments2Click = () => {
        navigate("/StudentApplicationDocuments");
    };

    const handleUploadClick = () => {
        navigate("/StudentUploadPage");
    };

    const handleAnnouncementsClick = () => {
        navigate("/StudentAnnouncementsPage");
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
                <div className="big-div" onClick={handleDocuments2Click}>
                    <FaReadme className="icon" />
                    <div className="icon-text">My Application Documents</div>
                </div>
                <div className="big-div" onClick={handleUploadClick}>
                    <FaUpload className="icon" />
                    <div className="icon-text">Upload Document</div>
                </div>
                <div className="big-div" onClick={handleAnnouncementsClick}>
                    <FaBullhorn className="icon" />
                    <div className="icon-text">Announcements</div>
                </div>
            </div>
            <div className='calendar-container'>
                <Calendar/>
            </div>
        </div>
    );
}

export default StudentHome;


