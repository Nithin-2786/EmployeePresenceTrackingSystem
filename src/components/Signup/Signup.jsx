import React, { useState } from "react";
import "../login/login.css";

function SignUp(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    function Redirect(event) {
        event.preventDefault();
        const userData = {
            username,
            email,
            password,
        };

        fetch('http://localhost:5002/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (response.ok) {
                
                alert("Registration successful");
            } else {
                
                alert("Registration failed");
            }
        })
        .catch(error => {
            console.log("Error:", error);
        });
        props.pages()
    }

    return (
        <div className="login">
            <section className="container">
                <div className="login-container">
                    <div className="circle circle-one"></div>
                    <div className="form-container">
                        <img src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png" alt="illustration" className="illustration" />
                        <h1 className="opacity">SignUp</h1>
                        <form>
                            <input type="text" placeholder="USERNAME" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder="PASSWORD" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <input type="password" placeholder="CONFIRM PASSWORD" />
                            <button className="opacity" onClick={Redirect}>SUBMIT</button>
                        </form>
                        <div className="register-forget opacity"></div>
                    </div>
                    <div className="circle circle-two"></div>
                </div>
                <div className="theme-btn-container"></div>
            </section>
        </div>
    );
}

export default SignUp;
