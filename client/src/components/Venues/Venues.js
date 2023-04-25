import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import pubImage from "../../assets/kenton.jpg";
import "./Venues.css";
import NewVIbeButton from "../NewVIbeButton/NewVIbeButton";
import Nav from "../Nav/Nav";

const Venues = () => {
  const { type } = useParams();
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    getVenues();
    console.log("Venues: ", venues);
  }, []);

  const getVenues = () => {
    fetch("http://localhost:3002/venues")
      .then((res) => res.json())
      .then((data) => setVenues(data))
      .catch((err) => console.log("Error: ", err));
  };

  const deleteVenue = (id) => {
    fetch(`http://localhost:3002/venue/delete/${id}`, { method: "DELETE" })
      .then(() => {
        console.log(`Deleted record with ID ${id}`);
      })
      .catch((err) => {
        console.error(`Failed to delete record with ID ${id}`, err);
      });
  };

  const formatDate = (d) => {
    const hourMins = new Date(d).toLocaleTimeString("en-US").toString();
    return hourMins.slice(0, -6) + hourMins.slice(-2);
  };

  console.log({ venues });

  return (
    <div>
      <Nav type={type} />
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
                  <div className="vibe-icon"></div>
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
