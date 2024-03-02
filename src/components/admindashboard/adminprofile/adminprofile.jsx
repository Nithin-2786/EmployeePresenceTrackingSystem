import React, { useState, useEffect } from 'react';
import "./adminprofile.css"

function Profile(props){
   const [name,setName]=useState('')
   const [department,setDepartment]=useState('')
   const [dob,setDob]=useState('')
   const ws=new WebSocket("ws://localhost:3000")

   function handleSubmit(event){
      event.preventDefault()
      ws.send(JSON.stringify({action:"updateduserInfo",name,department,dob}))
   }

   function handleNameChange(event) {
      setName(event.target.value);
   }

   function handleDobChange(event) {
      setDob(event.target.value);
   }

   function handleDepartmentChange(event) {
      setDepartment(event.target.value);
   }

    useEffect(()=>{
       
        ws.onopen=()=>{
            console.log("Websocket is opened")
            ws.send(JSON.stringify({action:"getuserInfo",username:props.username}))
        }
       ws.onmessage=(event)=>{
        
        const data=JSON.parse(event.data)
        console.log("data received",data)
        if(data.action === "userInfo") {
          setName(data.userInfo[0]?.username || '');
          setDepartment(data.userInfo[0]?.department || '');
          let dob = data.userInfo[0]?.dob;
          if (dob) {
              dob = dob.split('-').reverse().join('-');
          }
          setDob(dob || '');
      }
      if(data.action==="successful"){
        alert("Your data Updated Successfully")
      }
       }
       ws.onclose=()=>{
        console.log("websocket closed")
       }
       return (()=>{
            ws.close()
       })
    },[])

    return (
      <div className='profile-container'>
      <div className='profile'>
         <h1>User Profile</h1>
         <form onSubmit={handleSubmit}>
            <div>
               <label htmlFor="name">Name:</label>
               <input type="text" id="name" name="name" value={name} onChange={handleNameChange} />
            </div>
            <div>
               <label htmlFor="dob">Date of Birth:</label>
               <input type="date" id="dob" name="dob" value={dob ? dob.split('T')[0] : ''} onChange={handleDobChange} />
            </div>
            <div>
               <label htmlFor="department">Department:</label>
               <input type="text" id="department" name="department" value={department} onChange={handleDepartmentChange} />
            </div>
            <button type="submit">Save</button>
         </form>
      </div>
      </div>
    )
}

export default Profile;
