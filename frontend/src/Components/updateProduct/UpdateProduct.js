import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./updateProduct.css";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:4000/productUpdatePage/${params.id}`,{
        headers:{
            authorization:`tree ${JSON.parse(localStorage.getItem('token'))}`
          }
    });
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const updateProduct = async () => {
    let result = await fetch(`http://localhost:4000/updateProduct/${params.id}`,{
        method: "Put",
        body: JSON.stringify({ name, price, category, company }),
        headers: {
          "Content-Type": "Application/json",
          authorization:`tree ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
    result = await result.json();
    if (result) {
      navigate("/productlist");
    }
  };
  return (
    <div className="update-product">
      <h1 className="updateProduct-head">Update product</h1>
      <input
        className="inputBox"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
      />
      {error && !name && <span className="error">*Enter valid name!</span>}
      <input
        className="inputBox"
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Enter price"
      />
      {error && !price && <span className="error">*Enter valid price!</span>}

      <input
        className="inputBox"
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Enter category"
      />
      {error && !category && <span className="error">*Enter valid category!</span>}
      <input
        className="inputBox"
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Enter company name"
      />
      {error && !company && <span className="error">*Enter valid company name!</span>}
      <button
        className="button-updateProduct"
        type="button"
        onClick={updateProduct}
      >
        Update
      </button>
    </div>
  );
};

export default UpdateProduct;
