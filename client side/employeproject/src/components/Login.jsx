import React, { useState } from 'react';
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../apis/fetchapi';

function Login() {

  const [logData, setLogData] = useState({
    username: "",
    password: ""
  });
  console.log(logData);

  const navigate = useNavigate();

  const formSubmit = () => {
    const { username, password } = logData;
    if (!username || !password) {
      toast.warning("Invalid input");
    } else {
      userLogin(logData).then((res) => {
        console.log(res.data.token);
        sessionStorage.setItem("token", res.data.token);
        toast.success("Login successful");
        navigate('/home');
      }).catch(err => {
        toast.error("Login failed. Please try again.");
      });
    }
  };

  return (
    <div className="d-flex w-100 p-5 m-5 align-items-center justify-content-center">
      <div className="w-50 p-5">
        <h3>Login Form</h3>
        <FloatingLabel controlId="floatingUserName" label="Username" className="mb-3">
          <Form.Control
            type="text"
            onChange={(e) => setLogData({ ...logData, username: e.target.value })}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Password">
          <Form.Control
            type="password"
            onChange={(e) => setLogData({ ...logData, password: e.target.value })}
          />
        </FloatingLabel>
        <div>
          <button className='btn btn-success' onClick={formSubmit}>Login</button>
          <Link to={"/reg"} style={{ textDecoration: 'none' }} className="text-white opacity-5">
            New User? SignUp here.
          </Link>
        </div>
       
        
        </div>
      </div>
    
  );
}

export default Login;
