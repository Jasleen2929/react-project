import react, { useState } from "react";
import { useEffect } from "react";
import Update from "./update";
import { Link,useNavigate } from "react-router-dom";
import LoadingSpinner from "./loadingSpinner";
import AddUser from "./addUser";
import Sidenav from "./sidenvav";
import{
  FaBars,
}from "react-icons/fa";




const Home = () => {
  const userDetails = JSON.parse(localStorage.getItem("users"));
  const [myUser, setMyUser] = useState([userDetails]);

  const [showDelete, setShowDelete] = useState(false);
  const[showUpdate,setShowUpdate]=useState(false)
  const[id,setId]=useState(null);

  const[updateID,setUpdateID]=useState(null);
  const[u,setU]=useState({});
  const navigate = useNavigate();
  const handleCloseDelete = () => setShowDelete(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleCloseADD=()=>setShowAdd(false)

  const [isLoading, setIsLoading] = useState(false);
  const [showAdd,setShowAdd]=useState(false);
  const[ showSidebar,setShowSidebar]=useState(false);
  const handleCloseBar=()=>setShowSidebar(false)
  
  function deleteButton(id) {
    setShowDelete(true);
    setId(id);
  }
  
  function deleteItem() {
    const newUsers = myUser.filter((item, index) => index !== id);
    setMyUser(newUsers);
    setShowDelete(false);
    localStorage.setItem("users", JSON.stringify(newUsers));
  }
  function updateButton(index){
    setShowUpdate(true)
    setUpdateID(index)
    setU(userDetails[index])
  }

  useEffect(() => {
    setMyUser(userDetails);
  }, []);

  useEffect(() => {
  }, [myUser]);
  const apiNavigate=()=>{
    navigate('/apiList');
    setIsLoading(true)
  }
  function addUser(){
      setShowAdd(true)
  }
  function displaySidebar(){
    setShowSidebar(!showSidebar)
  }

  return (
    <div className="page">
     <div  >
    <Sidenav 
      handleCloseBar={handleCloseBar}
      apiNavigate={apiNavigate}
      showSidebar={showSidebar}
    />
    </div>
      <div className={`${showSidebar ? 'contentshifted' : 'content'}`}>
      <div className="navbar"> 
      <div className="nav-div">
        <div>
      <FaBars className="hamburger-btn" onClick={displaySidebar}/>
      </div>
      <div>
        <h3 className="nav-heading" >User Base</h3>
        </div>
        </div>
        <div>
          <button className="nav-btn" onClick={addUser}>Add User</button>
        </div>
      </div>
      <div className="table"></div>
      <table className="user-table">
        <tbody>
        <tr>
          <th>S.no</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Contact Number</th>
          <th>Email</th>
          <th></th>
        </tr>
        {myUser.map((item, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.contactNumber}</td>
              <td>{item.email}</td>
              <td>
                <button  className="form-btn" onClick={()=>deleteButton(index)}>delete</button>
                <button className="form-btn"  onClick={()=>updateButton(index)}>update</button>
              </td>
            </tr>
          );
        })}
        </tbody>
      </table>
      </div>
     
       {showDelete && <div className="modal" tabIndex="-1" role="dialog" showDelete={showDelete} onHide={handleCloseDelete} >
      <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Are you sure you want to delete?</h5>
              </div>
                <button type="button" className="close-btn" data-dismiss="modal" aria-label="Close" onClick={handleCloseDelete}>
                  <span aria-hidden="true" className="close">&times;</span>
                 </button>
          </div>
            <div className="modal-footer">
              <button type="button" className="modal-btn" onClick={()=>deleteItem()} >Yes</button>
              <button type="button" className="modal-btn" data-dismiss="modal" onClick={handleCloseDelete}>No</button>
            </div>
          </div>
    </div>}
        
    {showUpdate && <Update 
        showUpdate={showUpdate}
        handleCloseUpdate={handleCloseUpdate}
        updateID={updateID}
        u={u}
    />}
      {showAdd && <AddUser 
        showAdd={showAdd}
        setShowAdd={setShowAdd}
        handleCloseADD={handleCloseADD}
  
      />}
    
     
    </div>
  );
}
export default Home;


