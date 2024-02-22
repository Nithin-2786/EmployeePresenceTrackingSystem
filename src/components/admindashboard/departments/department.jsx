import React, { useState, useEffect } from "react";
import "./department.css"
function Department() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000');

    ws.onopen = function () {
      console.log('WebSocket connection opened');
      ws.send(JSON.stringify({ action: 'getDepartments' }));
    };

    ws.onmessage = function (event) {
      console.log('Received message:', event.data);
      
      const data = JSON.parse(event.data);
      if (data.action === 'getDepartments') {
        setDepartments([...data.departments]);
      }
    };

    ws.onclose = function () {
      console.log('WebSocket connection closed');
    };

    
    return () => {
      ws.close();
    };
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  useEffect(() => {
    console.log('Departments:', departments); // Log the departments state for debugging
  }, [departments]); // Log whenever departments change

  return (
    <div className="departments">
       <div className="container1">
       <header><h3>No.of Departments</h3></header>
        <h1>{departments.length}</h1>
       </div>
      <h2>Departments</h2>
      <table>
        <thead>
          <tr>
            <th>Department ID</th>
            <th>Department Name</th>
          </tr>
        </thead>
        <tbody>
          {departments.map(department => (
            <tr key={department.departmentId}>
              <td>{department.departmentId}</td>
              <td>{department.departmentName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
}

export default Department;
