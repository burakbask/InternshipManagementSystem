import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUpload, FaCheckCircle, FaBullhorn, FaFile } from 'react-icons/fa';
import logo from '../assets/iyte_logo-tur.png';
import '../styles/InternshipCoordinatorHome.css';

function InternshipCoordinatorHome() {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate("/InternshipCoordinatorDocumentsPage");
  };

  return (
    <div>
      <nav className="navbar">
        <img src={logo} className='logo' alt="Logo" />
        <p className='ims-header'>INTERNSHIP MANAGEMENT SYSTEM</p>
        <div className="logout-button" onClick={() => navigate("/")}>Log Out</div>
      </nav>

      <div className="outside-div">
        <div className="big-div" onClick={handleUploadClick}>
          <FaUpload className="icon" />
          <div className="icon-text">Upload Document</div>
        </div>
        <div className="big-div">
          <FaCheckCircle className="icon" />
          <div className="icon-text">Verify Internship</div>
        </div>
        <div className="big-div">
          <FaBullhorn className="icon" />
          <div className="icon-text">Announcements</div>
        </div>
        <div className="big-div">
          <FaFile className="icon" />
          <div className="icon-text">SSI Process</div>
        </div>
      </div>
    </div>
  );
}

export default InternshipCoordinatorHome;
