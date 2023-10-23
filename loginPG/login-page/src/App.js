import logo from './logo.svg';
import './App.css';
import {
  Route,
  Routes,
} from "react-router-dom";
import Register from './register';
import Login from './login';
import React from "react"
import Home from "./home"
import ApiList from "./apiList"
import LoadingSpinner from './loadingSpinner';
import Sidenav from './sidenvav';


function App() {
  return(
    <>
      <Routes>
        
          <Route exact path="/" element={<Register/>} />
          
          <Route exact path="/login" element={<Login/>} />

          <Route exact path="/home" element={<Home />}/>

          <Route exact path="/apiList" element={<ApiList />} />

          <Route exact path="/sidenav" element={<Sidenav />}/>
      
      </Routes>

    </>
  );
}
export default App;
