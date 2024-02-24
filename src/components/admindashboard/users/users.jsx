import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip } from "recharts";

function User() {
  const [users, setUsers] = useState([]);
  const [activeusers,setactiveusers]=useState({})
  const data = [
		{ name: "Active Users", students: Object.keys(activeusers).length },
		{ name: "Inactive Users", students: users.length-Object.keys(activeusers).length },
		];
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000');

    ws.onopen = function () {
      console.log('WebSocket connection opened');
      ws.send(JSON.stringify({ action: 'getUsers' }));
      ws.send(JSON.stringify({action:"getActiveUsers"}))
    };

    ws.onmessage = function (event) {
      console.log('Received message:', event.data);
      
      const data = JSON.parse(event.data);
      if (data.action === 'getUsers') {
        setUsers([...data.users]);
      }
      if(data.action==='getActiveUsers'){
        setactiveusers(data.usersWithoutCheckOut)
      }
    };

    ws.onclose = function () {
      console.log('WebSocket connection closed');
    };

    
    return () => {
      ws.close();
    };
  }, []); 
  useEffect(() => {
    console.log('Users', users); 
  }, [users]); 

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
      
      <div  style={{ marginTop: '20px',marginBottom:"30px" }}>
        <h1>No.of Active Users</h1>
       <h1> {Object.keys(activeusers).length} </h1>
      </div>
      <div className="chart">
       
			<h3 style={{position:"absolute",top:"11px",marginBottom:"10px"}}>
				Doughnut Chart
			</h3><div className="donut">
			<PieChart width={300} height={300}>
				<Tooltip />
				<Pie
					data={data}
					dataKey="students"
					outerRadius={150}
					innerRadius={100}
					fill="rgb(12, 172, 156)"
					
				/>
			</PieChart>
      </div>
		</div>
    </div>
  );
}

export default User;
