import React, { useState } from "react";
import Form from "./form";

function Update({showUpdate,handleCloseUpdate,updateID,u}){
    const userDetails=JSON.parse(localStorage.getItem("users"));
   
    const [user,setUser]=useState(u);
    //const userID=userDetails.findIndex(item=>item===user)
    


    let userID = userDetails.findIndex( element => {
        if (element.password=== user.password) {
          return true;
        }
      });
      console.log("useriD",userID)
    function handleupdateChange(e){
        setUser((prevUser) => {
            return {
              ...prevUser,
              [e.target.name]: e.target.value,
            };
          });
          
    }

    function handleupdateSubmit(index,event){
        //event.preventDefault();
        //debugger;
        let i;
        for(i=0;i<userDetails.length;i++){
            if(userID===i){
                userDetails[i]=user
                console.log(userDetails[i]);
            }
        }
        //i=userDetails.indexOf(u)
        //userDetails.push(user)
        localStorage.setItem("users", JSON.stringify(userDetails));
        alert('update successful');
    }
    return(
         <div className="modal" tabIndex="-1" role="dialog">
      <div className="modal-update-dialog" role="document">
                <button type="button" className="close-btn-update" data-dismiss="modal" aria-label="Close" onClick={handleCloseUpdate}>
                  <span aria-hidden="true" className="close">&times;</span>
                </button>
        <Form
            formTitle={"Update"}
            submitbtn={"Update"}
            //onSubmit={handleSubmit}
            redirect={""}
            allowRedirect={false}
            fData={user}
            handleChange={handleupdateChange}
            handleSubmit={handleupdateSubmit}
            invalidForm={null}
        />  
    </div>
    </div>
    )
}

export default Update;