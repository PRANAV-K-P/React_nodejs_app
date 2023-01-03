import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);
  const collectData = async () => {
    if (!name || !email || !password) {
      setError(true);
      return false;
    } else {
      let result = await fetch("http://localhost:4000/register", {
        method: "post",
        body: JSON.stringify({ name, email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      localStorage.setItem("user", JSON.stringify(result.result));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
    }
  };

  return (
    <div className="register">
      <h1 className="register-Heading">Register</h1>
      <input
        className="inputBox"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter Name"
      />
      {error && !name && (
        <span className="signup-error">*Enter valid name!</span>
      )}

      <input
        className="inputBox"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />
      {error && !email && (
        <span className="signup-error">*Enter valid email!</span>
      )}

      <input
        className="inputBox"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      />
      {error && !password && (
        <span className="signup-error">*Enter valid password!</span>
      )}
      <button className="btn-register" type="button" onClick={collectData}>
        Sign Up
      </button>
    </div>
  );
};
export default SignUp;
