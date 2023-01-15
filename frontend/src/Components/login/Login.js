import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './login.css'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] =useState(false)
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);
  const handleLogin = async () => {
    if(!email || !password ){
      setError(true)
      return false
    }else{
      let result = await fetch("http://localhost:4000/login", {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      if (result.auth) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", JSON.stringify(result.auth));
        navigate("/");
      } else {
        alert("wrong credentials");
      }
    }
  };
  return (
    <div className="login">
      <div className="loginbox">
      <h1 className="login-heading">Login</h1>
      <input
        className="inputBox"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />
      {error && !email && <span className='login-error'>*Enter valid email!</span> }
      <input
        className="inputBox"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      />
      {error && !password && <span className='login-error'>*Enter valid password!</span> }
      <button className="btn-login" type="button" onClick={handleLogin}>
        Login
      </button>
      </div>
    </div>
  );
};

export default Login;
