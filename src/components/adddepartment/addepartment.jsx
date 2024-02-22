// AddDepartmentForm.jsx
import React, { useState } from 'react';
import "./dep.css"

function AddDepartmentForm() {
  const [departmentId, setDepartmentId] = useState('');
  const [departmentName, setDepartmentName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const ws = new WebSocket('ws://localhost:3000'); 
    ws.onopen = () => {
      ws.send(JSON.stringify({ action: 'addDepartment', departmentId, departmentName }));
    };
    setDepartmentId("");
    setDepartmentName("")
    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };
  };

  return (
    <div className='form'>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Department ID"
        value={departmentId}
        onChange={(e) => setDepartmentId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Department Name"
        value={departmentName}
        onChange={(e) => setDepartmentName(e.target.value)}
      />
      <button type="submit">Add Department</button>
    </form></div>
  );
}

export default AddDepartmentForm;
