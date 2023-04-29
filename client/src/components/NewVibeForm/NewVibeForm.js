import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./NewVibeForm.css";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import NewVibeAlert from "../NewVibeAlert/NewVibeAlert";
import Nav from "../Nav/Nav";
import { Bars } from "react-loader-spinner";

const NewVibeForm = () => {
  const { type } = useParams();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  // need to look at how to set the vibe better!
  const [vibes, setVibes] = useState("0");
  const [image, setImage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClass, setAlertClass] = useState("x");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleVibesChange = () => {
    setVibes("1");
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    !image && console.log("Please add an image");

    const imageRef = ref(storage, `images/${image.name + v4()}`);
    uploadBytes(imageRef, image).then(async () => {
      const imageUrl = await getDownloadURL(imageRef);
      console.log("Uploaded image with URL: ", imageUrl);

      const newVenueData = {
        type: type,
        name: name,
        location: location,
        vibes: vibes,
        image: imageUrl,
      };

      console.log({ newVenueData });

      try {
        const response = await fetch("http://localhost:3002/venue/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newVenueData),
        });

        if (response.ok) {
          console.log("New Vibe added successfully!");
          setAlertMessage("New Vibe added!");
          setAlertClass("success");
        } else {
          console.error("Failed to add Vibe");
          setAlertMessage("Failed to add Vibe");
          setAlertClass("fail");
        }
      } catch (error) {
        console.error(`Failed to add Vibe." : ${error}`);
        setAlertMessage(`Failed to add Vibe : ${error}`);
        setAlertClass("fail");
      }
      setShowAlert(true);
      setLoading(false);
    });
  };

  return (
    <div className="new-vibe-form-container">
      <Nav newVibetype={type} />
      <div className="spacer" />
      {showAlert && (
        <NewVibeAlert
          text={alertMessage}
          backgroundColor={alertClass}
          type={type}
        />
      )}
      {loading && (
        <>
          <div className="loader">
            <Bars
              height="80"
              width="80"
              radius="9"
              color="var(--primary)"
              ariaLabel="bars-loading"
              wrapperStyle
              wrapperClass
            />
          </div>
          <div className="alert-backdrop"></div>
        </>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Vibe Type
          <input type="text" value={type} readOnly />
        </label>
        <br />
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            required
          />
        </label>
        <br />
        <label>
          Location
          <input
            type="text"
            value={location}
            onChange={handleLocationChange}
            required
          />
        </label>
        <label>
          Add Photo
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <br />
        <button type="submit">Check Vibe In</button>
      </form>
    </div>
  );
};

export default NewVibeForm;
