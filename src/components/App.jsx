import React, { useState } from 'react';
import Login from './login/login';
import SignUp from './Signup/Signup';
import NavBar from "./admindashboard/sidebar/sidebar"
import Dashboard from './admindashboard//dashboard'
import AddDepartmentForm from './adddepartment/addepartment';
import { BrowserRouter as Router, Route, Routes, useNavigate ,Link} from 'react-router-dom';
import UserDashboard from './userdashboard/userdashboard';
import NavBar2 from './UserSideBar/usersidebar';
import AdminUsersPage from './admindashboard/adminuserpage/adminuser';
function App() {
    const [register, setRegister] = useState(false);
    const [islogin, setLogin] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);
    const [showadddepartment,setadddep]=useState(false);
    const [userRole, setUserRole] = useState('');
    const [username,setUsername]=useState('')
    const [showuserlogs,setuserlogs]=useState(false)
    function handlePages() {
        setRegister(!register);
    }
    function handleDashboardClick() {
        setShowDashboard(true);
    }
    function handledep(){
        setadddep(true);
    }
    function handleuserlogs(){
        setuserlogs(true)
    }
    function handleLogin(str,st) {
        setLogin(true);
        setUserRole(str);
        setUsername(st)
    }
    return (
        <div>
            {!islogin && (
                <div>
                    {register ? (
                        <SignUp pages={handlePages} />
                    ) : (
                        <Login pages={handlePages} isLogin={handleLogin} />
                    )}
                </div>
            )}

            {islogin && (
                <Router>
                {userRole==='admin' ?  
                    <NavBar handleDashboardClick={handleDashboardClick} handledep={handledep} handleuserlogs={handleuserlogs} /> 
                    : 
                    <NavBar2 handleDashboardClick={handleDashboardClick}/>
                }
                <Routes>
                    {/* Main route for Dashboard, accessible for authenticated users */}
                    {userRole === 'admin' ? (
                        <>
                            {showDashboard && <Route path="/dashboard" element={<Dashboard />} />}
                            {showadddepartment && <Route path="/addDepartment" element={<AddDepartmentForm />} />}
                            {showuserlogs && <Route path="/userlogs" element={<AdminUsersPage/>}/>}
                        </>
                    ) : (
                        <Route path="/dashboard" element={<UserDashboard userid={username}/>} />
                    )}
                </Routes>
            </Router>
            )}
            
            
        </div>
    );
}

export default App;
