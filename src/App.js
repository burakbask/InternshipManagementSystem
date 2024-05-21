import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage'; // SignUpPage bileşeninizi burada import edin
import StudentHome from './components/StudentHome';
import CompanyHome from './components/CompanyHome'; // CompanyHome bileşeninizi burada import edin
import InternshipCoordinatorHome from './components/InternshipCoordinatorHome'; // InternshipCoordinatorHome bileşeninizi burada import edin
import InternshipCoordinatorDocumentsPage from './components/InternshipCoordinatorDocumentsPage';
import AdminHome from './components/AdminHome';
import DepartmentSecretariatHome from './components/DepartmentSecretariatHome';
import AdminPendingDocuments from './components/AdminPendingAnnouncements'
import AdminViewAnnouncements from './components/AdminViewAnnouncements'
import StudentAnnouncementsPage from './components/StudentAnnouncementsPage';
import StudentUploadPage from './components/StudentUploadPage';
import AdminDocuments from './components/AdminDocuments';
import StudentDocuments from './components/StudentDocuments';
import InternshipCoordinatorAnnouncements from './components/InternshipCoordinatorAnnouncements';
import CompanyAnnouncement from './components/CompanyAnnouncement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/InternshipCoordinatorAnnouncements' element={<InternshipCoordinatorAnnouncements />} />
        <Route path='/StudentDocuments' element={<StudentDocuments />} />
        <Route path='/AdminDocuments' element={<AdminDocuments />} />
        <Route path='/StudentUploadPage' element={<StudentUploadPage />} />
        <Route path='/StudentAnnouncementsPage' element={<StudentAnnouncementsPage />} />
        <Route path='/AdminViewAnnouncements' element={<AdminViewAnnouncements />} />
        <Route path='/AdminPendingAnnouncements' element={<AdminPendingDocuments />} />
        <Route path="/DepartmentSecretariatHome" element={<DepartmentSecretariatHome />} />
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/InternshipCoordinatorDocumentsPage" element={<InternshipCoordinatorDocumentsPage />} /> 
        <Route path="/CompanyHome" element={<CompanyHome />} /> 
        <Route path="/InternshipCoordinatorHome" element={<InternshipCoordinatorHome />} /> 
        <Route path="/StudentHome" element={<StudentHome />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/CompanyAnnouncement" element={<CompanyAnnouncement />} />
      </Routes>
    </Router>
  );
}

export default App;
