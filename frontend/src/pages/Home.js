import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
function Home() {
let [loggedInUser,setLoggedInUser] = useState();
let [products,setProducts] = useState();
const navigate = useNavigate();

useEffect(()=>{
 let name= localStorage.getItem('loggedInUser')
 setLoggedInUser(name);
},[])

let handleLogout=()=>{
  handleSuccess("User Loggedout");
  localStorage.removeItem('token');
  localStorage.removeItem('loggedInUser');
setTimeout(()=>{
  navigate('/login')


},1000)

}

let fetchProduct=async()=>{
  const headers={
    headers:{
      'Authorization': localStorage.getItem('token'),
    }
  }
try {
  
  let url="http://localhost:8080/products";
  let response = await fetch(url,headers);
  let result = await response.json();
  console.log(result);
  setProducts(result);

} catch (error) {
  handleError(error);
  
}
}
useEffect(()=>{
  fetchProduct();

},[])


  return (
    <div>
       <h1>Hello, {loggedInUser}</h1>
       <button onClick={handleLogout}>Logout</button>
       <div className="products">
      {
        products && products?.map((item, index)=>{
          return(
            <>
            <h1>Products</h1>
            <ul key={index}> 
              <span >{item.name} : {item.price}</span>
            </ul>   </>
          )
     
        })
      }
       </div>
       <ToastContainer />
    </div>
  )
}

export default Home