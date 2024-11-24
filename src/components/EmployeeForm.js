// src/components/EmployeeForm.js
import React, { useState } from 'react';
import { addEmployee } from '../api/api';

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    f_Id: '',
    f_Name: '',
    f_Email: '',
    f_Mobile: '',
    f_Designation: '',
    f_gender: '',
    f_Course: '',
    f_Createdate: new Date().toISOString().split('T')[0],
    f_Image: null,
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const response = await addEmployee(data);
      setMessage(response.message);
    } catch (error) {
      setMessage(error.response.data.message || 'Failed to add employee');
    }
  };

  return (
    <div className="container">

    <div>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <input name="f_Id" placeholder="ID" onChange={handleChange} required />
        <input name="f_Name" placeholder="Name" onChange={handleChange} required />
        <input name="f_Email" placeholder="Email" onChange={handleChange} required />
        <input name="f_Mobile" placeholder="Mobile" onChange={handleChange} required />
        <input name="f_Designation" placeholder="Designation" onChange={handleChange} required />
        <select name="f_gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input name="f_Course" placeholder="Course" onChange={handleChange} required />
        <input
          name="f_Createdate"
          value={formData.f_Createdate}
          readOnly
          disabled
        />
        <input type="file" name="f_Image" accept="image/*" onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    </div>
  );
};

export default EmployeeForm;
