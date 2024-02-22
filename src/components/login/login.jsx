import React, { useState } from "react";
import "./login.css";
import { jwtDecode } from 'jwt-decode';
function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleClick() {
        props.pages();
    }

    

function handleSubmit(event) {
    event.preventDefault();
    const userData = {
        username,
        password,
    };
    fetch('http://localhost:5002/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.accesstoken) {
            alert("Login successful");

           
            const decoded = jwtDecode(data.accesstoken);
            
            props.isLogin(decoded.user.type,decoded.user.username);
        } else {
            console.error("Login failed", data.message);
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}


    return (
        <div className="login">
            <section className="container">
                <div className="login-container">
                    <div className="circle circle-one"></div>
                    <div className="form-container">
                        <img src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png" alt="illustration" className="illustration" />
                        <h1 className="opacity">LOGIN</h1>
                        <form>
                        <input type="text" placeholder="USERNAME" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                    
                        <input type="password" placeholder="PASSWORD"value= {password} onChange={(e)=>{setPassword(e.target.value)}}/>  
                            <button className="opacity" onClick={handleSubmit}>SUBMIT</button>
                        </form>
                        <div className="register-forget opacity">
                            <a onClick={handleClick} >REGISTER</a>
                            <a href="">FORGOT PASSWORD</a>
                        </div>
                    </div>
                    <div className="circle circle-two"></div>
                </div>
                <div className="theme-btn-container"></div>
            </section>
        </div>
    );
}

export default Login;
