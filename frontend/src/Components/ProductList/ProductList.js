import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import "./productlist.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch(`http://localhost:4000/products/${userId}`,{
      headers:{
        authorization:`tree ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    if(result){
      setProducts(result);
    }
    
  };

  const deleteProduct=async(id)=>{
    let result = await fetch(`http://localhost:4000/delete-product/${id}`,{
      method:"Delete",
      headers:{
        authorization:`tree ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result=await result.json()
    if(result){
      getProducts();
    }
  }

  const searchHandle=async(event)=>{
    let key=event.target.value
    if(key){
      let result =await fetch(`http://localhost:4000/search/${key}`,{
        headers:{
          authorization:`tree ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
      result=await result.json()
      if(result){
        setProducts(result)
      }
    }else{
      getProducts()
    }
   
  }

  return (
    <div className="product-list">
        
      <h3>All Products</h3>
      <input type="text" className="search-product" placeholder="Search Products"
      onChange={searchHandle}
      />
      <ul style={{fontWeight:500}}>
          <li>S.No</li>
          <li>Name</li>
          <li>Price</li>
          <li>Category</li>
          <li>Company</li>
          <li>Operation</li>
      </ul>
     { products.length>0 ? products.map((item,index) => (
        
        <ul key={item._id}>
          <li>{index+1}</li>
          <li>{item.name}</li>
          <li>{item.price}</li>
          <li>{item.category}</li>
          <li>{item.company}</li>
          <li>
          <button 
          onClick={()=>{
            if(window.confirm(`Do you want to delete ${item.name} ?`)){
              deleteProduct(item._id)  
            }
          }}>Delete</button>
          <Link to={"/update/"+item._id}>Update</Link>
          </li>
        </ul>
      ))
      :
      <h2>No Result Found</h2> 
     }
    </div>
  );
};

export default ProductList;
