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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/DepartmentSecretariatHome" element={<DepartmentSecretariatHome />} />
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/InternshipCoordinatorDocumentsPage" element={<InternshipCoordinatorDocumentsPage />} /> 
        <Route path="/CompanyHome" element={<CompanyHome />} /> 
        <Route path="/InternshipCoordinatorHome" element={<InternshipCoordinatorHome />} /> 
        <Route path="/StudentHome" element={<StudentHome />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
