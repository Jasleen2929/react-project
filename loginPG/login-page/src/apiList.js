import react, { useEffect } from "react";
import { useState } from "react";
import LoadingSpinner from "./loadingSpinner";

function ApiList() {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const [index, setIndex] = useState(null);
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([
    {
      title: "",
      body: "",
      userId: "",
      id: "",
    },
  ]);
  const[isLoading,setIsLoading]=useState(false)
  const [updateID, setUpdateID] = useState(null);
  const [showupdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const [updateData,setUpdateData] = useState(null);
  const [submit,setSubmit]=useState(false)
  useEffect(() => {
    setIsLoading(true)
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((item) => {
        setData(item)
        setIsLoading(false)
    //    setNewData(item);
        });
  }, []);

  useEffect(() => {
    if (updateID) {
        fetch("https://jsonplaceholder.typicode.com/posts/"+ updateID)
        .then((res) => res.json())
        .then((reply) => {
            setUpdateData(reply);
        });
    }
  }, [updateID]);

  
  function DeleteData(id) {
    setShowDelete(true);
    setIndex(id);
    setUpdateID(id);
  }
  function UpdateData(id) {
    setShowUpdate(true);
    setUpdateID(id);
  }

  function deleteItem(index) {
    const newdata = data.filter((item) => item.id !== index);
    setData(newdata);
    setShowDelete(false);
    fetch("https://jsonplaceholder.typicode.com/posts" + "/" + index, {
      method: "DELETE",
    })
      .then(() => {
        console.log("removed");
      })
      .catch((err) => {
        console.error(err);
      });
  }
 
  function handleChange(e) {
    setUpdateData((prevUpdateData) => {
        return {
          ...prevUpdateData,
          [e.target.name]: e.target.value,
        };
      });
  }

  function handleSubmit(event) {
    event.preventDefault()
    let i;
   
    for(i=0;i<data.length;i++){
        if(data[i].id===updateData.id){
            data[i]=updateData;
            setShowUpdate(false)
        }
}
alert('update successful');
  }
 

  return (
    <>
        {isLoading && <LoadingSpinner />}
        {!isLoading &&<div className="navbar">
            <h3 className="nav-heading">API List</h3>
        </div>}
        <table className="user-table">
        <tbody>
          <tr>
            <th>Title</th>
            <th>Body</th>
            <th>UserID</th>
            <th>Id</th>
            <th></th>
          </tr>

          {data.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.body}</td>
                <td>{item.userId}</td>
                <td>{item.id}</td>
                <td>
                  <button
                    className="form-btn"
                    onClick={() => DeleteData(item.id)}
                  >
                    delete
                  </button>
                  <button
                    className="form-btn"
                    onClick={() => UpdateData(item.id)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* delete modal */}
      {showDelete && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          showDelete={showDelete}
          onHide={handleCloseDelete}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Are you sure you want to delete?
                </h5>
              </div>
              <button
                type="button"
                className="close-btn"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseDelete}
              >
                <span aria-hidden="true" className="close">
                  &times;
                </span>
              </button>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="modal-btn"
                onClick={() => deleteItem(index)}
              >
                Yes
              </button>
              <button
                type="button"
                className="modal-btn"
                data-dismiss="modal"
                onClick={handleCloseDelete}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* update modal */}

      {showupdate && (
        <div className="modal" tabIndex="-1" role="dialog"onHide={handleCloseUpdate}>
          <div className="modal-update-dialog" role="document">
            <button
              type="button"
              className="close-btn-update"
              data-dismiss="modal"
              aria-label="Close"
              onClick={handleCloseUpdate}
            >
              <span aria-hidden="true" className="close">
                &times;
              </span>
            </button>
            
                    { updateData && <div className="login-box">
                     <form>
                      <h3>Update Fields</h3>
                      <input
                        type="text"
                        placeholder={updateData.title}
                        onChange={(e)=>handleChange(e)}
                        name="title"
                        value={updateData.title|| ""}
                      />
                      <input
                        type="text"
                        placeholder={updateData.body}
                        onChange={(e)=>handleChange(e)}
                        name="body"
                        value={updateData.body||""}
                      />
                      <input
                        type="text"
                        placeholder={updateData.userId}
                        onChange={(e)=>handleChange(e)}
                        name="userId"
                        value={updateData.userId||"" }
                      />
                      <input
                        type="text"
                        placeholder={updateData.id}
                        onChange={(e)=>handleChange(e)}
                        name="id"
                        value={updateData.id||""}
                        readOnly
                      />
                      <button
                        className="btn-rg"
                        onClick={(e) => handleSubmit(e)}
                      >
                        Update
                      </button>
                    </form>
                    </div>
              }
              
          </div>
        </div>
      )}
    </>
  );
}
export default ApiList;
