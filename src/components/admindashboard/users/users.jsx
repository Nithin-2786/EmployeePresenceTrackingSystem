import React, { useState, useEffect } from "react";

function User() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000');

    ws.onopen = function () {
      console.log('WebSocket connection opened');
      ws.send(JSON.stringify({ action: 'getUsers' }));
    };

    ws.onmessage = function (event) {
      console.log('Received message:', event.data);
      
      const data = JSON.parse(event.data);
      if (data.action === 'getUsers') {
        setUsers([...data.users]);
      }
    };

    ws.onclose = function () {
      console.log('WebSocket connection closed');
    };

    // Close the WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  useEffect(() => {
    console.log('Users', users); // Log the users state for debugging
  }, [users]); // Log whenever users change

  return (
    <div className="Users">
     <div className="container2"> 
      <header><h3>No. of Users</h3></header>
      <h1>{users.length}</h1>
    </div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default User;
