import React, { useState ,useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import Form from "./form";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    firstNameError: "",
    lastName: "",
    lastNameError:"",
    contactNumber: "",
    contactNumberError:"",
    email: "",
    emailError:"",
    password: "",
    passwordError:"",
  });
  
  const [invalidForm, setInvalidForm]= useState(true);
  const navigate = useNavigate();

  function handleregisterChange(e) {
    validateField(e.target.name, e.target.value);
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleregisterSubmit(event) {
    event.preventDefault();
    let userList = JSON.parse(localStorage.getItem("users")) || [];
    userList.push(formData);
    console.log('new user ',userList);
    localStorage.setItem("users", JSON.stringify(userList));
    alert('registration successful');
    navigate('/login');
  }


  const validateField=(key, value)=>{
    if (!value || value == '') {
      formData[`${key}Error`] = `${key} could not be empty`;
    }
    else{
      formData[`${key}Error`]="";
    }
    const emailRegex=/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const passwordRegex=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const users = JSON.parse(localStorage.getItem('users'));
    switch(key) {
      case 'email': {
        const users = JSON.parse(localStorage.getItem('users'));
        let errorMsg=""
        if (!emailRegex.test(value)) {
          errorMsg = 'Please enter valid email id';
        }
        else if (users.find(item => item.email == value)) {
            errorMsg = 'This email is already registered.';
          }
          else{
            errorMsg="";
          }
        formData.emailError=errorMsg
        return;
      }
      
        case 'contactNumber':{
          const users=JSON.parse(localStorage.getItem('users'));
          let errorMsg = '';
          const numRegex=/^[0-9]*$/
          
          if(value.length>10 || value.length<10){
            errorMsg='please enter valid phone number';
          }
          else if(users.find(item=>item.contactNumber==value)){
            errorMsg='This Phone Number already exists';
          }
          else if(!numRegex.test(value)){
            errorMsg='please enter a valid number'
          }
          else{
            errorMsg="";
          }
          formData.contactNumberError = errorMsg;
          return;
        }
        case 'password':{
          let errorMsg=''
          if(!passwordRegex.test(value)){
            errorMsg=" Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
          }else{
            errorMsg='';
          }
          formData.passwordError=errorMsg
          return;
          }
        }
        setFormData(formData);
        canSubmit();
      }

      

  const canSubmit = () => {
    //TODO
    // check if form has any error and on basis of that update the disable flag value
    const keyList = ['firstNameError', 'lastNameError', 'contactNumberError', 'emailError', 'passwordError'];
    let errorCount = 0;
    keyList.forEach(item => {
      if (formData[item] != ''){
        errorCount++;
      }
      console.log("errors",errorCount)
    });
    setInvalidForm(errorCount > 0);
  }
  return (
  <>
    <Form 
      formTitle={"Register"}
      submitbtn={"Register"}
      redirect={"Already registered? Login Now"}
      allowRedirect={true}
      fData={formData}
      handleChange={handleregisterChange}
      handleSubmit={handleregisterSubmit}
      invalidForm={invalidForm}
    />
  </>
  );
}

export default Register;
