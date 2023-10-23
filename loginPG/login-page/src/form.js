import React, { useState ,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";

function Form({formTitle,submitbtn,redirect,allowRedirect,fData,handleChange,handleSubmit,invalidForm}) {
  const navigate = useNavigate();
  const[data,setData]=useState(fData)
 
  return (
    <div className="login-box">
      <form>
        <h3>{formTitle}</h3>
        <input
          type="text"
          placeholder="First Name"
          onChange={handleChange}
          name="firstName"
          value={fData.firstName}
        />
        <p>{fData.firstNameError}</p>

        <input
          type="text"
          placeholder="Last Name"
          onChange={handleChange}
          name="lastName"
          value={fData.lastName}
        />
        <p>{fData.lastNameError}</p>

        <input
          type="text"
          placeholder="Contact Number"
          onChange={handleChange}
          name="contactNumber"
          value={fData.contactNumber}
          maxLength={10}
        />
        <p>{fData.contactNumberError}</p>

        <input
          type="email"
          placeholder="Email"
          onChange={handleChange}
          name="email"
          value={fData.email}
        />
        <p>{fData.emailError}</p>

        <input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          name="password"
          value={fData.password}
        />
        <p>{fData.passwordError}</p>
        <button className="btn-rg" onClick={(e)=>handleSubmit(e)} disabled={invalidForm}>{submitbtn}</button>
        <br />
        <br />
        {allowRedirect && <Link to="/login">{redirect}</Link>}
      </form>
    </div>
  );
}

export default Form;
