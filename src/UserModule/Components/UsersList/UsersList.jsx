import React, { useEffect, useState } from "react";
import Header from "../../../SharedModule/Components/Header/Header";
import axios from "axios";
import noData from "../../../assets/images/nullItem1.png";

export default function UsersList() {
  const [usersList, setusersList] = useState([]);
  

  const getList = async () => {
    let token = localStorage.getItem("adminToken");
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:443/api/v1/Users/?pageSize=10&pageNumber=1",
        { headers: { Authorization: token } }
      );
      setusersList(response.data.data);
      // console.log(response.data.data);
     

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <Header
        title={"Users list"}
        description="You can now add your items that any user can order it from the Application and you can edit"
      />
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
                 </tr>
                  
                  )}
                
              </tbody>
  </table>
  
  :   <img src={noData} className="" />}
</div>
  
    </>
  );
}
