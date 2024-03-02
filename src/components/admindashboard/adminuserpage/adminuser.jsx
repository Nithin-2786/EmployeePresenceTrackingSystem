import React, { useState, useEffect } from 'react';
import './AdminUsersPage.css'; // Add your CSS file

function AdminUsersPage() {
  const [userLogs, setUserLogs] = useState([]);
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000'); 

    ws.onopen = () => {
      console.log('WebSocket connection opened');
      // Inform the server that this is the admin page
      ws.send(JSON.stringify({ action: 'adminConnected' }));
    };

    ws.onmessage = (event) => {
      console.log('Received message:', event.data);
      const data = JSON.parse(event.data);
      if (data.action === 'checkIn') {
        setUserLogs((prevLogs) => [...prevLogs, data]);
      }
      if(data.action==='previousData'){
        setUserLogs(data.data); // Setting user logs directly from the received data
      }
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close(); // Close WebSocket connection when component unmounts
    };
  }, []);

  return (
    <div className="admin-users-page">
    <div className='container3'> 
      <h2>User Logs</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>date</th>
            <th>Check-In Time</th>
            <th>Check-Out Time</th>
            <th>Active Time</th>
            
          </tr>
        </thead>
        <tbody>
    {userLogs.map((log, index) => {
    console.log('Check-in:', log.checkIn);
    console.log('Check-out:', log.checkOut);
    return (
      <tr key={index}>
        <td>{log.username}</td>
        <td>{log.date}</td>
        <td>{log.checkIn}</td>
        <td>{log.checkOut}</td>
        <td>
  {log.checkIn && log.checkOut ? 
    (() => {
      const checkInTime = new Date();
      const checkOutTime = new Date();
      const [checkInHours, checkInMinutes, checkInSeconds] = log.checkIn.split(':');
      const [checkOutHours, checkOutMinutes, checkOutSeconds] = log.checkOut.split(':');

      checkInTime.setHours(checkInHours, checkInMinutes, checkInSeconds);
      checkOutTime.setHours(checkOutHours, checkOutMinutes, checkOutSeconds);

      const diffInMillis = checkOutTime - checkInTime;
      const hours = Math.floor(diffInMillis / (1000 * 60 * 60));
      const minutes = Math.floor((diffInMillis % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffInMillis % (1000 * 60)) / 1000);

      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      return formattedTime;
    })() 
    : '-'}
</td>

      </tr>
    );
  })}
</tbody>
      </table>
      </div>
    </div>
  );
}

export default AdminUsersPage;
