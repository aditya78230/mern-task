import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import EditEmployeeForm from './components/EditEmployeeForm';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        
        <Route path="/" element={<LoginPage />} />

        
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="/add-employee" element={<EmployeeForm />} />
        <Route path="/edit-employee/:id" element={<EditEmployeeForm />} />
      </Routes>
    </Router>
  );
};

export default App;
