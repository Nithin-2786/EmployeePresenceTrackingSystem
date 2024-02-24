import React from "react"
import "./dashboard.css"
import Department from "./departments/department"
import User from "./users/users"
import AdminUsersPage from "./adminuserpage/adminuser"
function Dashboard(){

    return (
   <div className="dashboard">
     <Department />
     <User />
  
    </div>
        )
}
export default Dashboard