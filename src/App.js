import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage'; // SignUpPage bileşeninizi burada import edin
import StudentHome from './components/StudentHome';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/StudentHome" element={<StudentHome />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
