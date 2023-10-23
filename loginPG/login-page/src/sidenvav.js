import React from 'react';

import { slide as Menu } from 'react-burger-menu';
import{
    FaBars,
}from "react-icons/fa"
import Home from './home';
import { Link,useNavigate } from "react-router-dom";

function Sidenav({handleCloseBar,apiNavigate,showSidebar}){
    const navigate=useNavigate();
    function logoutNavigate(){
        navigate("/login")
        
    }
    
    console.log(showSidebar);
    return(
        <>
        <div className={`${showSidebar ? 'containeropen' : 'container'}`} >
            <div className="sidebar">
                <button type="button" className="close-btn"  aria-label="Close" onClick={handleCloseBar} >
                    <span aria-hidden="true" className="close">&times;</span>
                </button>
                <hr></hr>
                <div className="btns">
                    <button className='sidebar-btn'onClick={apiNavigate}>API List</button>
                    <button className='sidebar-btn' onClick={logoutNavigate}>LogOut</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Sidenav;