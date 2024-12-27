import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AccountCircle, Lock, Login as LoginIcon } from '@mui/icons-material';
import '../styles/login.css';
import Header from './Header';
import Footer from './Footer';



function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
    event.preventDefault();  // Prevent default form submission behavior
    if (!username || !password) {
        toast.error('Please fill in both fields');
        return;
    }
    const userdata = { username, password };
    try {
        const response = await axios.get('https://careerconnect-springboot-production.up.railway.app/login', { params: userdata });
        if (response.data) {
            let {id,role} = response.data;
            localStorage.setItem('id',id)
            localStorage.setItem('username',userdata.username)
            localStorage.setItem('password',userdata.password)

            sessionStorage.setItem('id',id)
            sessionStorage.setItem('username',username)
            sessionStorage.setItem('role',role)
            if (role === 'student') {
                toast.success('Login successful');
                setTimeout(() => {
                    navigate('/studenthome');
                }, 1000);
            } else if (role === 'admin') {
                toast.success('Login successful');
                setTimeout(() => {
                    navigate('/adminhome');
                }, 1000);   
            } else if(role === 'recruiter')
                {
                    let {id,role,company} = response.data;
                localStorage.setItem('company',company)
                toast.success('Login successful');
                setTimeout(() => {
                    navigate('/recruiterhome');
                }, 1000);  
                }
            else{
                toast.error('Invalid Credentials');
            }
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                toast.error('Unauthorized: Invalid username or password');
            }
        } else {
            toast.error('Unable to connect to the server. Please try again later.');
        }
    }
};

return (
    <>
    <Header/>
    <ToastContainer theme="colored" /> // Light theme
    <div className="login-container">
        <h1 className="login-title">Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          {/* Username Input with Icon */}
          <div className="login-input-container">
            <AccountCircle />
            <input
              type="text"
              className="login-input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password Input with Icon */}
          <div className="login-input-container">
            <Lock />
            <input
              type="password"
              className="login-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-button">
                <LoginIcon />
            Login
            </button>


        </form>

        {/* Footer */}
        <Footer/>
      </div>
    </>
  );
}

export default Login;