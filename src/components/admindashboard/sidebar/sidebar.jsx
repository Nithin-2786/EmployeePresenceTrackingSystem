import React from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./sidebar.css"
function NavBar(props) {
  const navigate = useNavigate(); 

  function handleDashboardClick() {
    props.handleDashboardClick()
    navigate('/dashboard'); 
  }
  function handledepartment(){
   props.handledep()
    navigate('/addDepartment')
  }
  function handleuserlogs(){
    props.handleuserlogs()
     navigate('/userlogs')
   }
   function handleUserProfile(){
    navigate('/userlogs')
   }
  return (
    <div id="nav-bar">
  <input id="nav-toggle" type="checkbox"/>
  <div id="nav-header"><a id="nav-title" href="https://codepen.io" target="_blank">C<i className="fab fa-codepen"></i>DEPEN</a>
    <label for="nav-toggle"><span id="nav-toggle-burger"></span></label>
    <hr/>
  </div>
  <div id="nav-content">
  <Link className="nav-button" to="/dashboard" onClick={handleDashboardClick}>
      <i className="fas fa-palette"></i>
      <span>Dashboard</span>
    </Link> 
    <Link className="nav-button" to="/addDepartment" onClick={handledepartment}><i className="fas fa-images"></i><span>Add departments</span></Link>
    <Link className="nav-button" to="/userlogs" onClick={handleuserlogs}><i className="fas fa-images"></i><span>User Logs</span></Link>
    <hr/>
    
  </div>
  <input id="nav-footer-toggle" type="checkbox"/>
  <div id="nav-footer">
    <div id="nav-footer-heading">
      <div id="nav-footer-avatar"><img src="https://www.forthvalleywelcome.org/wp-content/uploads/2022/08/Image_Unnamed_User.jpg"/></div>
      <div id="nav-footer-titlebox"><Link id="nav-footer-title" to="/profile" onClick={handleUserProfile}>{props.username}</Link><span id="nav-footer-subtitle">{props.userRole}</span></div>
      <label for="nav-footer-toggle"><i className="fas fa-caret-up"></i></label>
    </div>
    <div id="nav-footer-content">
    </div>
  </div>
</div>
  );
}

export default NavBar;
