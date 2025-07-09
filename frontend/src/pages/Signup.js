import React, { useState } from 'react'
import {ToastContainer} from 'react-toastify'
import {Link, useNavigate} from "react-router-dom"
import { handleError, handleSuccess } from '../utils'
function Signup() {
  const [SignupInfo,setSignupInfo]=useState({ 
      name:'',
      email:'',
      password:''

    })
    const navigate = useNavigate();



  const  handleChange=(e)=>{

    const {name,value}= e.target;
console.log(name, value);
const copySignupInfo = {...SignupInfo}
copySignupInfo[name]=value;
setSignupInfo(copySignupInfo);

  }
  console.log("sign up info", SignupInfo)

  const handleSignup=async(e)=>{
    e.preventDefault();
    let {name,email,password}= SignupInfo;
    if(!name || !email || !password){
      return handleError("All Feilds are required")
    }

    try {
      const Url = "http://localhost:8080/auth/signup";
      let response = await fetch(Url,{
        method:"POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(SignupInfo)

      });
      const result = await response.json();
      const {success, message,error}= result;
      if(success){
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login')
          
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
      <h1>Signup</h1>
      <form onSubmit={handleSignup} >
        <div>
          <label htmlFor='name'>Name</label>
          <input
          onChange={handleChange}
           type="text" 
          autoFocus name='name'
          placeholder='Enter your Name'
         value={SignupInfo.name}
          />
        </div>


          <div>
          <label htmlFor='email'>Email</label>
          <input
            onChange={handleChange}
           type="email" 
           name='email'
          placeholder='Enter your Email'
          value={SignupInfo.email}

          />
        </div>

          <div>
          <label htmlFor='password'>Password</label>
          <input
          onChange={handleChange}
           type="password" 
           name='password'
          placeholder='Enter your Password'
          value={SignupInfo.password}
          />
        </div>
        <button type='submit'>signup</button>
        <span>Already have an account ?
          <Link to="/login">Login</Link>
          
           </span>


      </form>
      <ToastContainer />
    </div>
  )
}

export default Signup