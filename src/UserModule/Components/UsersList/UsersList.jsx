import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import axios from "axios";
import noData from "../../../assets/images/nullItem1.png";

export default function UsersList() {
  const [usersList, setusersList] = useState([]);

  const [searchName, setsearchName] = useState("");
  const [pagesArray, setpagesArray] = useState([]);
  console.log(usersList);



  const getList = async (pageNo, pageSize, name) => {
    let token = localStorage.getItem("adminToken");
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Users/",
        { headers: { Authorization: token } ,
        params: {
          pageNumber: pageNo,
          pageSize: pageSize,
          userName: name,
        
        },}
      );
      setpagesArray(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      setusersList(response.data.data);
      // console.log(response.data.data);
   

    } catch (error) {
      console.log(error);
    }
  };
  const getUserNameValue = (input) => {
    setsearchName(input.target.value);
    // console.log(input.target.value);
    getList(1,5, input.target.value);
  };


  useEffect(() => {
    getList(1,8);
  }, []);

  return (
    <>
      <Header
        title={"Users list"}
        description="You can now add your items that any user can order it from the Application and you can edit"
      />
       <div className="row p-3 justify-content-center">
        <div className="col-md-8">
          <input
            type="text"
            className="form-control"
            placeholder="search by Name"
            onChange={getUserNameValue}
          />
        </div>
      </div>
<div className="table-container px-4 my-3 text-center">
  {usersList.length > 0 ?
  <table className="table">
       <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col"> Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col"></th>
                 

                </tr>
              </thead>

              <tbody className="">
                
                  {usersList.map((user)=>
                   <tr className="" key={user.id}>
                   <th scope="row">{user.id}</th>
                   <td >{user.userName}</td>
                   <td className="">
                    
                    {user.imagePath ? <img src={`https://upskilling-egypt.com/${user.imagePath}`} className=" table-user-img " />:
                    <img src={noData} className=" table-user-img" />
                    }
                    </td>
                   <td>{user.email}</td>
                   <td>{user.phoneNumber}</td>
                   <td className="td-test position-relative"><button onClick={()=>setactionFootm("d-block")} className="border-0 bg-body"><i className="fa-solid fa-ellipsis-vertical"></i></button>
                   </td> 
               
                 </tr>   
                  )}
                     
                
              </tbody>
  </table>
  
  :   <img src={noData} className="" />}
       <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                {pagesArray.map((pageNo) => 
                  <li onClick={()=>getList(pageNo,7)} key={pageNo} className="page-item">
                    <a className="page-link" >
                      {pageNo}
                    </a>
                  </li>
                )}

                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>

</div>
  
    </>
  );
}
