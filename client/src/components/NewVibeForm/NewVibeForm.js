import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./NewVibeForm.css";
import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import Alert from "../NewVIbeAlert/NewVibeAlert";
import Nav from "../Nav/Nav";
import { Bars } from "react-loader-spinner";
import { Camera } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import ImagePreview from "./ImagePreview";
import { MdOutlineAddAPhoto } from "react-icons/md";

const NewVibeForm = () => {
  const { type } = useParams();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [vibes, setVibes] = useState("0");
  const [image, setImage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClass, setAlertClass] = useState("x");
  const [uri, setUri] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [closePreview, setClosePreview] = useState(false);
  const [facingMode, setFacingMode] = useState("user");
  const [currentLocation, setCurrentLocation] = useState(null);

  const API_URL = process.env.REACT_APP_API;

  useEffect(() => {
    const getLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const url = `https://address-from-to-latitude-longitude.p.rapidapi.com/geolocationapi?lat=${latitude}&lng=${longitude}`;
            const options = {
              method: "GET",
              headers: {
                "X-RapidAPI-Key": process.env.REACT_APP_GEO_API,
                "X-RapidAPI-Host":
                  "address-from-to-latitude-longitude.p.rapidapi.com",
              },
            };
            try {
              const response = await fetch(url, options);
              const result = await response.text();
              const resultJSON = JSON.parse(result);

              const city = resultJSON.Results[0].city;
              const region = resultJSON.Results[0].region;

              const locationText = region ? `${city}, ${region}` : city;
              setCurrentLocation(locationText);
            } catch (error) {
              console.error(error);
            }
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    const checkRearCamera = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const rearCamera = devices.find(
          (device) =>
            device.kind === "videoinput" &&
            device.label.toLowerCase().includes("back")
        );
        if (rearCamera) {
          setFacingMode("environment");
        }
      } catch (error) {
        console.error("Failed to enumerate media devices:", error);
      }
    };

    checkRearCamera();
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCamera = () => {
    setCameraOn(true);
  };

  const handleTakePhoto = (dataUri) => {
    fetch(dataUri)
      .then((res) => res.blob())
      .then((blob) => {
        setImage(blob);
        setUri(dataUri);
      });
  };

  const handleClosePreview = () => {
    setClosePreview(true);
    setUri(null);
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
        location: currentLocation,
        vibes: vibes,
        image: imageUrl,
      };

      try {
        const response = await fetch(`${API_URL}/venue/new`, {
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
        <Alert text={alertMessage} backgroundColor={alertClass} type={type} />
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
          <input type="text" value={type.replaceAll("_", " ")} readOnly />
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
          <input type="text" value={currentLocation} readOnly />
        </label>
        <label>
          <div className="photo-upload">
            {!cameraOn ? (
              <MdOutlineAddAPhoto onClick={handleCamera} />
            ) : uri ? (
              <ImagePreview uri={uri} closePreview={handleClosePreview} />
            ) : (
              <Camera
                onTakePhoto={(dataUri) => handleTakePhoto(dataUri)}
                idealFacingMode={facingMode}
              />
            )}
          </div>
        </label>
        <br />
        <button type="submit">Check Vibe In</button>
      </form>
    </div>
  );
};

export default NewVibeForm;
