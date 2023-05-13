import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Venues.css";
import NewVIbeButton from "../NewVIbeButton/NewVIbeButton";
import Nav from "../Nav/Nav";

const Venues = () => {
  const { type } = useParams();
  const [venues, setVenues] = useState([]);
  const [veriVibed, setVeriVibed] = useState(false);
  const removeUnderScoreFromType = type.replaceAll("_", " ");

  useEffect(() => {
    getVenues();
  }, []);

  const getVenues = () => {
    fetch("http://localhost:3002/venues")
      .then((res) => res.json())
      .then((data) => setVenues(data))
      .catch((err) => console.log("Error: ", err));
  };

  const formatDate = (d) => {
    const hourMins = new Date(d).toLocaleTimeString("en-US").toString();
    return hourMins.slice(0, -6) + hourMins.slice(-2);
  };

  const handleVibeClicked = (venue) => {
    const updatedVenue = { ...venue };
    veriVibed ? updatedVenue.vibes-- : updatedVenue.vibes++;
    setVeriVibed(!veriVibed);
    console.log(updatedVenue);

    setVenues((prevVenues) =>
      prevVenues.map((v) => (v._id === venue._id ? updatedVenue : v))
    );
    fetch(`http://localhost:3002/venue/vibes/${venue._id}`, {
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

  console.log("venues: ", venues);
  return (
    <div>
      <Nav venuesType={type} formatedType={removeUnderScoreFromType} />
      <div className="spacer" />
      <div className="venues">
        {venues
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
                    className={`vibe-icon ${veriVibed && "selected"}`}
                  ></div>
                  <h5>{venue.vibes}</h5>
                </div>
              </div>
            </div>
          ))}
      </div>
      <NewVIbeButton type={type} />
    </div>
  );
};

export default Venues;
