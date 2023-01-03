import React, { useState } from "react";
import "./profile.css";

const Profile = () => {
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const getUser = async () => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch(
      `http://localhost:4000/single-User-Data/${userId}`,
      {
        headers: {
          authorization: `tree ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    result = await result.json();
    if (result) {
      setImageUrl(result[0].imageUrl);
    }
  };
  getUser();

  const handleSubmit = async () => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("image", image);

    let result = await fetch("http://localhost:4000/updateImage", {
      method: "Put",
      body: formData,
      headers: {
        authorization: `tree ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      getUser();
    }
  };

  return (
    <>
      <div>
        <div className="centerDiv">
          <img
            src={`http://localhost:4000/${imageUrl}`}
            className="profileImage"
            width="200px"
            height="200px"
            alt="profile-pic"
          />
        </div>

        <div className="centerDiv2">
          <img
            alt="Posts"
            width="100px"
            height="100px"
            src={image ? URL.createObjectURL(image) : ""}
          />
          <br />
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
          />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">
            upload and Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
