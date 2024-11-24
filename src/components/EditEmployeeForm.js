import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchEmployees, updateEmployee } from '../api/api';

const EditEmployeeForm = () => {
  const { id } = useParams(); 
  const [formData, setFormData] = useState({});
  const [newImage, setNewImage] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const loadEmployee = async () => {
      try {
        const employees = await fetchEmployees(); 
        const employee = employees.find((emp) => emp.f_Id === parseInt(id));
        setFormData(employee || {});
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    loadEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        updatedData.append(key, value);
      });

      if (newImage) {
        updatedData.append('f_Image', newImage); 
      }

      await updateEmployee(id, updatedData);
      alert('Employee updated successfully');
      navigate('/employee-list'); 
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Failed to update employee');
    }
  };

  return (
    <div className="container">
    <div>
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>ID (Read-only):</label>
        <input
          name="f_Id"
          value={formData.f_Id || ''}
          readOnly
        />

        <label>Name:</label>
        <input
          name="f_Name"
          value={formData.f_Name || ''}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          name="f_Email"
          value={formData.f_Email || ''}
          onChange={handleChange}
          required
        />

        <label>Mobile:</label>
        <input
          name="f_Mobile"
          value={formData.f_Mobile || ''}
          onChange={handleChange}
          required
        />

        <label>Designation:</label>
        <input
          name="f_Designation"
          value={formData.f_Designation || ''}
          onChange={handleChange}
          required
        />

        <label>Gender:</label>
        <select
          name="f_gender"
          value={formData.f_gender || ''}
          onChange={handleChange}
          required
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Course:</label>
        <input
          name="f_Course"
          value={formData.f_Course || ''}
          onChange={handleChange}
          required
        />

        <label>Image:</label>
        <input
          type="file"
          name="f_Image"
          accept="image/*"
          onChange={handleImageChange}
        />

        <button type="submit">Update</button>
      </form>
    </div>
    </div>
  );
};

export default EditEmployeeForm;
