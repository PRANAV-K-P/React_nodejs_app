import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./addProduct.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const addProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:4000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-type": "application/json",
        authorization:`tree ${JSON.parse(localStorage.getItem('token'))}`
      },
    });
    result = await result.json();
    navigate("/productlist")
  };
  return (
      <div className="add-product">
        <h1 className="addProduct-head">Add product </h1>
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
        {error && !category && (
          <span className="error">*Enter valid category!</span>
        )}
        <input
          className="inputBox"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Enter company name"
        />
        {error && !company && (
          <span className="error">*Enter valid company name!</span>
        )}
        <button
          className="button-addProduct"
          type="button"
          onClick={addProduct}
        >
          Add Product
        </button>
      </div>
  );
};

export default AddProduct;
