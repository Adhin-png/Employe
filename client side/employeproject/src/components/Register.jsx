import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Link, Navigate } from "react-router-dom";
import { userRegister } from "../apis/fetchapi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



function Register() {

    const[userData,setUserRegister]=useState({
        username:"",
        email:"",
        password:"",
    })

    console.log(userData);
    
    const navigate=useNavigate()

    const formSubmit=()=>{
        const {username,email,password}=userData
        if(!username || !email || !password){
            toast.warning("Invalid input")
            
        }
        else{
            userRegister(userData).then((res)=>{
                console.log(res.data);
                toast.success("Registration succesfull")
                navigate('/')
                
            })
        }
    }






  return (
    <div className="d-flex w-100 p-5 m-5 align-items-center justify-content-center">
      <div className="w-50 p-5">
        <h3>Registration  Form</h3>
        <FloatingLabel controlId="floatingUserName" label="UserName" className="mb-3"
        >
          <Form.Control type="text" onChange={(e)=>{setUserRegister({...userData,username:e.target.value})}} />
        </FloatingLabel>

        <FloatingLabel controlId="floatingemail" label="Email Id" className="mb-3"
        >
          <Form.Control type="email" onChange={(e)=>{setUserRegister({...userData,email:e.target.value})}}/>
        </FloatingLabel>

        <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control type="password" onChange={(e)=>{setUserRegister({...userData,password:e.target.value})}} />
        </FloatingLabel>
        <div className="mt-5 d-flex justify-content-center">
          <button className="btn btn-primary me-5" onClick={(e)=>{formSubmit()}}>Register</button>
          <Link to={"/"} style={{textDecoration:'none'}}className="text-white opacity-5">Already have an account?    SignUp here.</Link>
        </div>  
      </div>
    </div>
  );
}

export default Register;