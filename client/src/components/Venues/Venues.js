import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "./Venues.css";
import NewVIbeButton from "../NewVIbeButton/NewVIbeButton";
import Nav from "../Nav/Nav";
import { AuthContext } from "../../AuthContext";
import Alert from "../AuthAlert/AuthAlert";

const Venues = () => {
  const { type } = useParams();
  const [venues, setVenues] = useState(null);
  const [veriVibed, setVeriVibed] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [hasVenuesOfType, setHasVenuesOfType] = useState(false);
  const { loggedIn } = useContext(AuthContext);

  const API_URL = process.env.REACT_APP_API;

  const removeUnderScoreFromType = type.replaceAll("_", " ");

  useEffect(() => {
    getVenues();
  }, []);

  const getVenues = () => {
    fetch(`${API_URL}/venues`)
      .then((res) => res.json())
      .then((data) => {
        const filteredVenues = data.filter(
          (venue) => venue.type === type && venue.vibes >= 0
        );
        setVenues(filteredVenues);
        setHasVenuesOfType(filteredVenues.length > 0);
      })
      .catch((err) => console.log("Error: ", err));
  };

  const formatDate = (d) => {
    const hourMins = new Date(d).toLocaleTimeString("en-US").toString();
    return hourMins.slice(0, -6) + hourMins.slice(-2);
  };

  const handleVibeClicked = (venue) => {
    const updatedVenue = { ...venue };
    let updatedVibes = updatedVenue.vibes;

    if (veriVibed && selectedVenue && selectedVenue._id === venue._id) {
      updatedVibes -= 1;
    } else {
      updatedVibes += 1;
    }

    setSelectedVenue(venue);
    setVeriVibed((prevVeriVibed) => {
      if (selectedVenue && selectedVenue._id === venue._id) {
        return !prevVeriVibed;
      }
      return true;
    });

    updatedVenue.vibes = updatedVibes;

    setVenues((prevVenues) =>
      prevVenues.map((v) => (v._id === venue._id ? updatedVenue : v))
    );
    fetch(`${API_URL}/venue/vibes/${venue._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedVenue),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log("Error: ", err));
  };

  return (
    <div>
      <Nav venuesType={type} formatedType={removeUnderScoreFromType} />
      <div className="spacer" />
      {!loggedIn && <Alert text="Log in or Sign up!" backgroundColor="fail" />}
      <div className="venues">
        {hasVenuesOfType && venues.length > 0 ? (
          venues
            .filter((venue) => venue.type === type && venue.vibes >= 0)
            .reverse()
            .map((venue) => (
              <div className="venue-container" key={venue._id}>
                <div className="checkbox"></div>
                <div className="venue-img">
                  <img src={venue.image} alt="pub" />
                </div>
                <div className="name">
                  <h2>{venue.name}</h2>
                  <h4>{venue.location}</h4>
                </div>
                <div className="vibe-details">
                  <h5>Checked in - {formatDate(+venue.timestamp)}</h5>
                  <div className="vibe-votes">
                    <div
                      onClick={() => handleVibeClicked(venue)}
                      className={`vibe-icon ${
                        veriVibed &&
                        selectedVenue &&
                        selectedVenue._id === venue._id &&
                        "selected"
                      }`}
                    ></div>
                    <h5>{venue.vibes}</h5>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <h1>No current vibes</h1>
        )}
      </div>
      <NewVIbeButton type={type} />
    </div>
  );
};

export default Venues;
