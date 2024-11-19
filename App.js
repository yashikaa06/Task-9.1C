import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage'; // Adjust import if your file is named differently

const App = () => {
  return (
    <Router>
      <div>
        <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Dev@Deakin App</h1>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
