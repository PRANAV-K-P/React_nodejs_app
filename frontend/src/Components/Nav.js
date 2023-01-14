import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUsername } from "../redux/user";
const Nav = () => {
  let auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const { username } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.clear();
    navigate("/register");
  };

  useEffect(() => {
    (async () => {
      try {
        const userId = JSON.parse(localStorage.getItem("user"))._id;
        let result = await fetch(
          `http://localhost:4000/user/${userId}`,
          {
            headers: {
              authorization: `tree ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          }
        );
        result = await result.json();
        if (result) {
          dispatch(updateUsername(result[0]?.name));
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [auth]);

  console.log(auth,"----auth")
  auth = JSON.parse(auth)
  console.log(auth?.name,"----auth-name")

  return (
    <div>
      <Link to="/">
        <img
          className="logo"
          src="https://png.pngtree.com/element_origin_min_pic/16/11/02/bd886d7ccc6f8dd8db17e841233c9656.jpg"
          alt="logo"
        />{" "}
      </Link>

      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/productlist">Products </Link>
          </li>
          <li>
            <Link to="/add">Add Products </Link>
          </li>
          <li>
            <Link to="/update">Update Products </Link>
          </li>
          <li>
            <i style={{ color: "yellow", fontSize: 22 }}>Welcome {username}</i>{" "}
          </li>
          <li>
            <Link to="/profile">Profile </Link>
          </li>
          <li>
            <Link onClick={logout} to="/login">
              Logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/signup">Sign Up </Link>
          </li>
          <li>
            <Link to="/login">login </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Nav;
