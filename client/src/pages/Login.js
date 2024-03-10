import React, { useState, useContext } from 'react'; // Import useContext
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext"; // Import your AuthContext

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setAuthState } = useContext(AuthContext); // Use useContext
    let navigate = useNavigate();

    const login = async () => {
        const data = { username: username, password: password };
        try {
            const response = await axios.post('http://localhost:3002/auth/login', data)
            if (response.data.error) {
                alert(response.data.error);
            } else if (response.data.token) {
                // Store the token in sessionStorage
                sessionStorage.setItem('accessToken', response.data.token);
                // Redirect to another page
                navigate('/');
            } else {
                alert('Invalid response from the server.');
            }
        } catch (err) {
            console.log({ err: 'Network failed' })
        }
    };

    return (
        <div className="login-container">
            <div className="input-container">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    onChange={(event) => {
                        setUsername(event.target.value);
                    }}
                />
            </div>
            <div className="input-container">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(event) => {
                        setPassword(event.target.value);
                    }}
                />
            </div>

            <button onClick={login}>Login</button>
        </div>
    );
}

export default Login;





