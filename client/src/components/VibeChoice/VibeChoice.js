import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VibeChoice.css";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { IoIosPint } from "react-icons/io";
import { FaCocktail } from "react-icons/fa";
import { GiMusicalNotes } from "react-icons/gi";
import Nav from "../Nav/Nav";
import { AuthContext } from "../../AuthContext";
import { useContext } from "react";

const types = [
  { id: 1, type: "Cosy Pub", icon: <IoIosPint /> },
  { id: 2, type: "Chic Bar", icon: <FaCocktail /> },
  { id: 3, type: "Club Night", icon: <GiMusicalNotes /> },
];

const VibeChoice = () => {
  const [extraClass, setExtraClass] = useState();
  const [selectedType, setSelectedType] = useState("Cosy Pub");
  const navigate = useNavigate();
  // const { loggedIn } = useContext(AuthContext);

  const handleSelect = (type) => {
    const formatedType = type.replaceAll(" ", "_");
    // navigate(loggedIn ? `/venues/${formatedType}` : `/auth`);
    navigate(`/venues/${formatedType}`);
  };

  const handleSlideChange = (swiper) => {
    const activeSlideId = swiper.activeIndex + 1;
    console.log(types[swiper.activeIndex].type);
    setSelectedType(types[swiper.activeIndex].type);
    setExtraClass(`slide-${activeSlideId}`);
  };

  return (
    <div>
      <Nav />
      <div className="spacer" />
      <div className="choice-container">
        <div className={`types ${extraClass}`}>
          <Swiper
            modules={[Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            onSlideChange={handleSlideChange}
          >
            {types.map(({ id, type, icon }) => {
              return (
                <>
                  <SwiperSlide key={id}>
                    <h2>{type}</h2>
                    <h3>{icon}</h3>
                  </SwiperSlide>
                </>
              );
            })}
          </Swiper>
        </div>
        <button onClick={() => handleSelect(selectedType)}>Select</button>
      </div>
    </div>
  );
};

export default VibeChoice;
