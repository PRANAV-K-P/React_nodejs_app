import React, { useEffect, useState } from "react";
import "./ListUsers.css";

const ListUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    let result = await fetch('http://localhost:4000/users');
    result = await result.json();
    if(result){
        setUsers(result);
    }
    
  };
  const searchHandle=async(event)=>{
    let key=event.target.value
    if(key){
      let result =await fetch(`http://localhost:4000/searchUsers/${key}`)
      result=await result.json()
      if(result){
        setUsers(result)
      }
    }else{
        getUsers()
    }
  }

  return (
    <div className="user-list">
        
      <h2>All Users</h2>
      <input type="text" className="search-user" placeholder="Search users"
      onChange={searchHandle}
      />
      <ul style={{fontWeight:500}}>
          <li>S.No</li>
          <li>Name</li>
          <li>Email</li>
      </ul>
     { users.length>0 ? users.map((user,index) => (
        
        <ul key={user._id}>
          <li>{index+1}</li>
          <li>{user.name}</li>
          <li>{user.email}</li>
        </ul>
      ))
      :
      <h2>No Result Found</h2> 
     }
    </div>
  );
};

export default ListUsers;
