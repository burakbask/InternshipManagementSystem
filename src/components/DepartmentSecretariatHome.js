import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFolder, FaFile } from 'react-icons/fa';
import logo from '../assets/iyte_logo-tur.png';
import '../styles/DepartmentSecretariatHome.css';
import Calendar from 'react-calendar';

function DepartmentSecretariatHome() {
    const navigate = useNavigate();

    const handleDocumentsClick = () => {
        navigate("/DepartmentSecretariatDocuments");
    };

    const handleSSIClick = () => {
        navigate("/DepartmentSecretariatSSIPage");
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
                <div className="big-div" onClick={handleSSIClick}>
                    <FaFile className="icon" />
                    <div className="icon-text">Student SSI Documents</div>
                </div>
            </div>
            <div className='calendar-container'>
                <Calendar/>
            </div>
        </div>
    );
}

export default DepartmentSecretariatHome;
