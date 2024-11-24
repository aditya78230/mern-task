import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchEmployees, deleteEmployee } from '../api/api';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState('f_Id');
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await fetchEmployees(sortField, sortOrder);
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, [sortField, sortOrder]);

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(id);
        setEmployees((prev) => prev.filter((emp) => emp.f_Id !== id));
        alert('Employee deleted successfully');
      } catch (error) {
        console.error('Error deleting employee:', error);
        alert('Failed to delete employee');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (employees.length === 0) {
    return <div>No employees found</div>;
  }

  return (
    <div className="container1">
      <h2>Employee List</h2>
      <button onClick={() => navigate('/add-employee')}>Add Employee</button>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('f_Id')} className={sortField === 'f_Id' ? `sorted-${sortOrder}` : ''}>
              ID
            </th>
            <th>Image</th>
            <th onClick={() => handleSort('f_Name')} className={sortField === 'f_Name' ? `sorted-${sortOrder}` : ''}>
              Name
            </th>
            <th onClick={() => handleSort('f_Email')} className={sortField === 'f_Email' ? `sorted-${sortOrder}` : ''}>
              Email
            </th>
            <th>Mobile</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th onClick={() => handleSort('f_Createdate')} className={sortField === 'f_Createdate' ? `sorted-${sortOrder}` : ''}>
              Created Date
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.f_Id}>
              <td>{emp.f_Id}</td>
              <td>
                {emp.f_Image ? (
                  <img
                    src={emp.f_Image}
                    alt={`${emp.f_Name}'s profile`}
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                  />
                ) : (
                  'No Image'
                )}
              </td>
              <td>{emp.f_Name}</td>
              <td>{emp.f_Email}</td>
              <td>{emp.f_Mobile}</td>
              <td>{emp.f_Designation}</td>
              <td>{emp.f_gender}</td>
              <td>{emp.f_Course}</td>
              <td>{new Date(emp.f_Createdate).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEdit(emp.f_Id)}>Edit</button>
                <button onClick={() => handleDelete(emp.f_Id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
