import React from "react";
import "./ImagePreview.css";

const ImagePreview = ({ uri }) => {
  return (
    <div className="image-preview-container">
      {uri && <img className="image-preview" src={uri} alt="Preview" />}
    </div>
  );
};

export default ImagePreview;
