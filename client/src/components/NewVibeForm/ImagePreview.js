import React from "react";
import "./ImagePreview.css";
import { AiFillCloseCircle } from "react-icons/ai";

const ImagePreview = ({ uri, closePreview }) => {
  return (
    <div className="image-preview-container">
      {uri && <img className="image-preview" src={uri} alt="Preview" />}
      <AiFillCloseCircle
        className="close-icon"
        onClick={() => closePreview(true)}
      />
    </div>
  );
};

export default ImagePreview;
