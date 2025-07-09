import React, { useState } from 'react'
import {ToastContainer} from 'react-toastify'
import {Link, useNavigate} from "react-router-dom"
import { handleError, handleSuccess } from '../utils'
function Login() {
  const [loginInfo,setLoginInfo]=useState({ 
      email:'',
      password:''

    })
    const navigate = useNavigate();



  const  handleChange=(e)=>{

    const {name,value}= e.target;
console.log(name, value);
const copyLoginInfo = {...loginInfo}
copyLoginInfo[name]=value;
setLoginInfo(copyLoginInfo);

  }
  console.log("Login info", loginInfo)

  const handleLogin=async(e)=>{
    e.preventDefault();
    let {email,password}= loginInfo;
    if( !email || !password){
      return handleError("All Feilds are required")
    }

    try {
      const Url = "http://localhost:8080/auth/login";
      let response = await fetch(Url,{
        method:"POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)

      });
      const result = await response.json();
      const {success, message,jwtToken,name,error}= result;
      if(success){
        handleSuccess(message);
        localStorage.setItem('token',jwtToken)
        localStorage.setItem('loggedInUser',name)
        setTimeout(() => {
          navigate('/home')
          
        }, 1000);
      }else if(error){
        const details = error?.details[0].message;
        handleError(details);

      }else if(!success){
        handleError(message);
      }

      console.log(result);

      
    } catch (error) {
      handleError(error);
      
    }



  }


  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin} >
      
          <div>
          <label htmlFor='email'>Email</label>
          <input
            onChange={handleChange}
           type="email" 
           name='email'
          placeholder='Enter your Email'
          value={loginInfo.email}

          />
        </div>

          <div>
          <label htmlFor='password'>Password</label>
          <input
          onChange={handleChange}
           type="password" 
           name='password'
          placeholder='Enter your Password'
          value={loginInfo.password}
          />
        </div>
        <button type='submit'>Login</button>
        <span>Don't have an account ? 
          <Link to="/signup"> Signup</Link>
          
           </span>


      </form>
      <ToastContainer />
    </div>
  )
}

export default Login