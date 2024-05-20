import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFolder, FaClock, FaBullhorn } from 'react-icons/fa';
import logo from '../assets/iyte_logo-tur.png';
import '../styles/AdminHome.css';
import Calendar from 'react-calendar';

function AdminHome() {
    const navigate = useNavigate();

    const handleDocumentsClick = () => {
        navigate("/AdminDocumentsPage");
    };

    const handlePendingAnnouncementsClick = () => {
        navigate("/AdminPendingAnnouncements");
    };
    const handleAnnouncementsClick = () => {
        navigate("/AdminViewAnnouncements");
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
                <div className="big-div" onClick={handlePendingAnnouncementsClick}>
                    <FaClock className="icon" />
                    <div className="icon-text">Pending Announcements</div>
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

export default AdminHome;
