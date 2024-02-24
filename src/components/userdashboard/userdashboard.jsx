import React, { useState, useEffect } from 'react';
import './UserDashboard.css';

const UserDashboard = (props) => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000'); 
    
    setWs(socket);
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      console.log('Before unload event');
      if (isCheckedIn) {
        ws.send(JSON.stringify({ action: 'checkOut', username: props.userid }));
      }
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isCheckedIn, props.userid, ws]);
  
  useEffect(() => {
    if (isCheckedIn) {
      const interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }, 1000);

      setTimerInterval(interval);
      setStartTime(Date.now());  //Set start time when user checks in
    } else {
      // Clear timer when user checks out
      clearInterval(timerInterval);
      setElapsedTime(0);
      setStartTime(null);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isCheckedIn]);

  const handleCheckIn = () => {
    // Send check-in event to WebSocket server
    ws.send(JSON.stringify({ action: 'checkIn', username: props.userid }));
    setIsCheckedIn(true);
  };

  const handleCheckOut = () => {
    ws.send(JSON.stringify({ action: 'checkOut', username: props.userid }));
    setIsCheckedIn(false);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="dash">  
      <div className="user-dashboard">
        <h1>User Dashboard</h1>
        <div className="status">
          <p>Status: {isCheckedIn ? 'Checked In' : 'Checked Out'}</p>
          {isCheckedIn && <p>Time Elapsed: {formatTime(elapsedTime)}</p>}
        </div>
        <div className="buttons">
          {!isCheckedIn ? (
            <button onClick={handleCheckIn}>Check In</button>
          ) : (
            <button onClick={handleCheckOut}>Check Out</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
