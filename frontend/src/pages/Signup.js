import React from 'react'
import {ToastContainer} from 'react-toastify'
import {Link} from "react-router-dom"
function Signup() {
  return (
    <div className="container">
      <h1>Sign up</h1>
      <form >
        <div>
          <label htmlFor='name'>Name</label>
          <input type="text" 
          autoFocus name='name'
          placeholder='Enter your Name'
          />
        </div>


          <div>
          <label htmlFor='email'>Email</label>
          <input type="email" 
           name='email'
          placeholder='Enter your Email'
          />
        </div>

          <div>
          <label htmlFor='password'>Password</label>
          <input type="password" 
           name='password'
          placeholder='Enter your Password'
          />
        </div>
        <button>signup</button>
        <span>Already have an account ?
          <Link to="/login">Login</Link>
          
           </span>


      </form>
      <ToastContainer />
    </div>
  )
}

export default Signup