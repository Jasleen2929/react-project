import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import React from "react"

function Login(){
    const [userData,setUserData]=useState({
        userEmail:"",
        userPassword:""
    })

    const navigate = useNavigate();

    console.log(userData)
    function handleChange(e){
        setUserData((prevUserData)=>{
            return{
                ...prevUserData,
                [e.target.name]:e.target.value
            }

        })
    }

    function handleSubmit(e){
        e.preventDefault();
        checkLogin();
    }
    
    function checkLogin(){
        if (localStorage.getItem('users')){
            const formdetails=JSON.parse(localStorage.getItem('users')); // array of user objects
            //look for any object which is having current email and password in the array of object of users
            //if(userData.userEmail===formdetails.email && userData.userPassword===formdetails.password){
            if(formdetails.find(item=>item.email===userData.userEmail) && formdetails.find(item=>item.password===userData.userPassword)){
                alert("login successful")
                navigate('/home')
            }else{
                alert("incorrect username or password")
            }
        }
    }


    return(
        <div className="lgn-form">
        <form>
            <h3>Login form</h3>
            <input
            type="email"
            placeholder="Email"
            name="userEmail"
            value={userData.userEmail}
            onChange={handleChange}
            />

            <input
            type="password"
            placeholder="Password"
            name="userPassword"
            value={userData.userPassword}
            onChange={handleChange}
            />
            <button onClick={(e)=>handleSubmit(e)}>Login</button>
            <br />
            <br />
            <Link to="/">New user? Register now!</Link>
      </form>
      </div>
        
    );
}

export default Login;