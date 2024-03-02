import React from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "../admindashboard/sidebar/sidebar.css"
function NavBar2(props) {
  const navigate = useNavigate(); 

  function handleDashboardClick() {
    props.handleDashboardClick()
    navigate('/dashboard'); 
  }
  function handledepartment(){
   props.handledep()
    navigate('/addDepartment')
  }
  function handleUserProfile(){
    navigate('/Profile')
   }
  return (
    <div id="nav-bar">
  <input id="nav-toggle" type="checkbox"/>
  <div id="nav-header"><a id="nav-title" href="https://codepen.io" target="_blank">E.P.S</a>
    <label for="nav-toggle"><span id="nav-toggle-burger"></span></label>
    <hr/>
  </div>
  <div id="nav-content">
  <Link className="nav-button" to="/dashboard" onClick={handleDashboardClick}>
      <i className="fas fa-palette"></i>
      <span>Dashboard</span>
    </Link> 
    <hr/>
 
    <hr/>
    <div className="nav-button"><i className="fas fa-gem"></i><span></span></div>
    <div id="nav-content-highlight"></div>
  </div>
  <input id="nav-footer-toggle" type="checkbox"/>
  <div id="nav-footer">
    <div id="nav-footer-heading">
      <div id="nav-footer-avatar"><img src="https://www.forthvalleywelcome.org/wp-content/uploads/2022/08/Image_Unnamed_User.jpg"/></div>
      <div id="nav-footer-titlebox"><Link id="nav-footer-title" to="/Profile" onClick={handleUserProfile}>{props.username}</Link><span id="nav-footer-subtitle">{props.userRole}</span></div>
      <label for="nav-footer-toggle"><i className="fas fa-caret-up"></i></label>
    </div>
    <div id="nav-footer-content">
    </div>
  </div>
</div>
  );
}

export default NavBar2;
