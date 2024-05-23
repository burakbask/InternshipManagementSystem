import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import CompanyAnnouncements from './components/CompanyAnnouncements';
import ProtectedRoute from './components/ProtectedRoute';
import CompanyUploadPage from './components/CompanyUploadPage';
import CompanyDocuments from './components/CompanyDocuments';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/InternshipCoordinatorAnnouncements' element={
          <ProtectedRoute allowedRoles={['commission']}>
            <InternshipCoordinatorAnnouncements />
          </ProtectedRoute>
        } />
        <Route path='/StudentDocuments' element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentDocuments />
          </ProtectedRoute>
        } />
        <Route path='/AdminDocuments' element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDocuments />
          </ProtectedRoute>
        } />
        <Route path='/StudentUploadPage' element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentUploadPage />
          </ProtectedRoute>
        } />
        <Route path='/StudentAnnouncementsPage' element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentAnnouncementsPage />
          </ProtectedRoute>
        } />
        <Route path='/AdminViewAnnouncements' element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminViewAnnouncements />
          </ProtectedRoute>
        } />
        <Route path='/AdminPendingAnnouncements' element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminPendingDocuments />
          </ProtectedRoute>
        } />
        <Route path="/DepartmentSecretariatHome" element={
          <ProtectedRoute allowedRoles={['department_secretariat']}>
            <DepartmentSecretariatHome />
          </ProtectedRoute>
        } />
        <Route path="/AdminHome" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminHome />
          </ProtectedRoute>
        } />
        <Route path="/InternshipCoordinatorDocumentsPage" element={
          <ProtectedRoute allowedRoles={['commission']}>
            <InternshipCoordinatorDocumentsPage />
          </ProtectedRoute>
        } /> 
        <Route path="/CompanyHome" element={
          <ProtectedRoute allowedRoles={['company']}>
            <CompanyHome />
          </ProtectedRoute>
        } /> 
        <Route path="/InternshipCoordinatorHome" element={
          <ProtectedRoute allowedRoles={['commission']}>
            <InternshipCoordinatorHome />
          </ProtectedRoute>
        } /> 
        <Route path="/StudentHome" element={
          <ProtectedRoute allowedRoles={['student']}>
            <StudentHome />
          </ProtectedRoute>
        } />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/CompanyAnnouncements" element={
          <ProtectedRoute allowedRoles={['company']}>
            <CompanyAnnouncements />
          </ProtectedRoute>
        } />

        <Route path="/CompanyUplaodPage" element={
          <ProtectedRoute allowedRoles={['company']}>
            <CompanyUploadPage />
          </ProtectedRoute>
        } />
         <Route path="/CompanyDocuments" element={
          <ProtectedRoute allowedRoles={['company']}>
            <CompanyDocuments />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
